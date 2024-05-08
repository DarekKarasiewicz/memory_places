import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailActions } from 'Redux/addTrailSlice';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import PinIcon from 'icons/PinIcon';
import BaseInput from 'Base/BaseInput';
import BaseTextarea from 'Base/BaseTextarea';
import BaseButton from 'Base/BaseButton';
import BaseSelect from 'Base/BaseSelect';
import BaseRadioGroup from 'Base/BaseRadioGroup';
import WebIcon from 'icons/WebIcon';
import WikiIcon from 'icons/WikiIcon';
import GoogleMap from 'GoogleMap/GoogleMap';
import BaseImageUpload from 'Base/BaseImageUpload/BaseImageUpload';
import { registerAppChanges } from 'utils';
import AlertIcon from 'icons/AlertIcon';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions } from 'Redux/adminDataSlice';

function AdminTrailActionSection({ action, trailId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [type, setType] = useState([]);
  const [period, setPeriod] = useState([]);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const dateRef = useRef(null);
  const typeRef = useRef(null);
  const periodRef = useRef(null);
  const wikiLinkRef = useRef(null);
  const webLinkRef = useRef(null);
  const [isValidName, setIsValidName] = useState(null);
  const [isValidDesc, setIsValidDesc] = useState(null);
  const [isValidDate, setIsValidDate] = useState(null);
  const [isValidType, setIsValidType] = useState(null);
  const [isValidPeriod, setIsValidPeriod] = useState(null);
  const [inputLength, setInputLength] = useState(0);
  const [descLength, setDescLength] = useState(0);
  const [toVerification, setToVerification] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [actionTitle, setActionTitle] = useState(t('admin.common.memo_trail_add'));
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`http://127.0.0.1:8000/memo_places/types`);
      const typeItems = responseType.data
        .map((obj) => ({
          id: obj.id,
          label: t(`modal.${obj.value}`),
          value: obj.id,
          order: obj.order,
        }))
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      const idSet = new Set(typeItems.map((item) => item.id));

      if (!idSet.has(0)) {
        setType([{ id: 0, label: t('modal.all'), value: 0 }, ...typeItems]);
      } else {
        setType(typeItems);
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`http://127.0.0.1:8000/memo_places/periods`);
      const periodItems = responsePeriod.data
        .map((obj) => ({
          id: obj.id,
          label: t(`modal.${obj.value}`),
          value: obj.id,
          order: obj.order,
        }))
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      const idSet = new Set(periodItems.map((item) => item.id));

      if (!idSet.has(0)) {
        setPeriod([{ id: 0, label: t('modal.all'), value: 0 }, ...periodItems]);
      } else {
        setPeriod(periodItems);
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    if (action === 'edit' || action === 'view') {
      const getPlaceItems = async (trailId) => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/admin_dashboard/path/pk=${trailId}`,
          );

          nameRef.current.value = response.data.place_name;
          descRef.current.value = response.data.description;
          dateRef.current.value = response.data.found_date;
          typeRef.current.value = response.data.type;
          periodRef.current.value = response.data.period;
          wikiLinkRef.current.value = response.data.wiki_link;
          webLinkRef.current.value = response.data.topic_link;
          setToVerification(response.data.verified === true ? 'false' : 'true');

          validateName(nameRef.current.value);
          validateDescription(descRef.current.value);
          validateDate(dateRef.current.value);
          validateType(typeRef.current.value);
          validatePeriod(periodRef.current.value);
        } catch (error) {
          dispatch(notificationModalActions.changeType('alert'));
          dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        }
      };

      if (action === 'edit') {
        setActionTitle(t('admin.common.memo_trail_edit'));
      }

      if (action === 'view') {
        setActionTitle(t('admin.common.memo_trail_view'));
        setIsReadOnly(true);
      }

      getPlaceItems(trailId);
    }
  }, []);

  const handleNameChange = () => {
    if (nameRef.current) {
      const length = nameRef.current.value.length;
      setInputLength(length);
    }
  };

  const handleDescChange = () => {
    if (descRef.current) {
      const length = descRef.current.value.length;
      setDescLength(length);
    }
  };

  const handleVerificationChange = (event) => {
    setToVerification(event.target.value);
  };

  const verificationOptions = [
    { value: 'true', label: t('admin.common.yes'), name: 'verification' },
    { value: 'false', label: t('admin.common.no'), name: 'verification' },
  ];

  const validateName = (name) => {
    const nameRegex = /[\w'():-]+/;
    return setIsValidName(nameRegex.test(name));
  };

  const validateDescription = (desc) => {
    if (desc.length > 0) {
      return setIsValidDesc(true);
    }
    return setIsValidDesc(false);
  };

  const validateDate = (date) => {
    return setIsValidDate(isNaN(date));
  };

  const validateType = (type) => {
    if (type !== 0) {
      return setIsValidType(true);
    }
    return setIsValidType(false);
  };

  const validatePeriod = (period) => {
    if (period !== 0) {
      return setIsValidPeriod(true);
    }
    return setIsValidPeriod(false);
  };

  const validateForm = () => {
    if (
      isValidName === true &&
      isValidDate === true &&
      isValidDesc === true &&
      isValidType === true &&
      isValidPeriod === true
    ) {
      return true;
    }

    return false;
  };

  const handleConfirm = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      var isValidated = toVerification === 'true' ? false : true;

      if (action === 'edit') {
        axios
          .put(`http://127.0.0.1:8000/admin_dashboard/path/${trailId}/`, {
            place_name: nameRef.current.value,
            description: descRef.current.value,
            found_date: dateRef.current.value,
            type: typeRef.current.value,
            period: periodRef.current.value,
            wiki_link: wikiLinkRef.current.value,
            topic_link: webLinkRef.current.value,
            verified: isValidated,
          })
          .then(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            registerAppChanges('admin.changes_messages.place_edit', user, trailId);
            navigate('/adminDashboard');
          })
          .catch(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
            navigate('/adminDashboard');
          });
      } else {
        axios
          .post(`http://127.0.0.1:8000/admin_dashboard/path/`, {
            user: user.user_id,
            place_name: nameRef.current.value,
            description: descRef.current.value,
            found_date: dateRef.current.value,
            type: typeRef.current.value,
            period: periodRef.current.value,
            wiki_link: wikiLinkRef.current.value,
            topic_link: webLinkRef.current.value,
            verified: isValidated,
          })
          .then(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            dispatch(adminDataActions.updateIsTrailsChanged(true));
            registerAppChanges('admin.changes_messages.place_add', user, nameRef.current.value);
            navigate('/adminDashboard');
          })
          .catch(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
            navigate('/adminDashboard');
          });
      }
    } else {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <>
      <div className='px-24 py-12 bg-secondaryBgColor text-textColor min-h-[calc(100vh-5rem)] flex flex-col gap-6 h-full'>
        <div className='flex justify-start ml-6 items-center gap-4 text-4xl font-bold'>
          <PinIcon />
          <span>{actionTitle}</span>
        </div>
        <hr />
        <div className='flex gap-6'>
          <div className='flex flex-col gap-6 w-2/4'>
            <div className='bg-thirdBgColor p-10'>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <BaseInput
                    type='text'
                    name='nameInput'
                    label={t('common.name')}
                    ref={nameRef}
                    isValid={isValidName}
                    onChange={() => {
                      validateName(nameRef.current.value);
                      handleNameChange();
                    }}
                    onBlur={() => validateName(nameRef.current.value)}
                    readOnly={isReadOnly}
                  />
                  <div className='flex justify-between px-2'>
                    {!isValidName ? (
                      <span className='text-red-500 flex items-center gap-2'>
                        <AlertIcon className='h-6 w-6' color='#ef4444' />
                        <span>{t('admin.common.field_required')}</span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                    <span>{inputLength} / 50</span>
                  </div>
                </div>
                <div className='flex justify-start items-center gap-4'>
                  <div className='flex flex-col gap-2 w-1/2'>
                    <BaseSelect
                      label={t('common.type')}
                      name={t('common.type')}
                      options={type}
                      ref={typeRef}
                      onChange={() => {
                        validateType(typeRef.current.value);
                      }}
                      onBlur={() => validateType(typeRef.current.value)}
                      readOnly={isReadOnly}
                      isValid={isValidType}
                    />
                    {!isValidType ? (
                      <span className='text-red-500 flex items-center gap-2'>
                        <AlertIcon className='h-6 w-6' color='#ef4444' />
                        <span>{t('admin.common.field_required')}</span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className='flex flex-col gap-2 w-1/2'>
                    <BaseSelect
                      label={t('common.period')}
                      name={t('common.period')}
                      options={period}
                      ref={periodRef}
                      onChange={() => {
                        validatePeriod(periodRef.current.value);
                      }}
                      onBlur={() => validatePeriod(periodRef.current.value)}
                      readOnly={isReadOnly}
                      isValid={isValidPeriod}
                    />
                    {!isValidPeriod ? (
                      <span className='text-red-500 flex items-center gap-2'>
                        <AlertIcon className='h-6 w-6' color='#ef4444' />
                        <span>{t('admin.common.field_required')}</span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 bg-thirdBgColor p-10'>
              <p className='text-xl'>{t('admin.common.lat_lng_info')}</p>
              <BaseButton
                breakWidth={true}
                className='w-fit'
                name={t('common.location_select')}
                btnBg='blue'
                disabled={isReadOnly}
              />
            </div>
            <div className='bg-thirdBgColor p-10'>
              <div className='flex flex-col gap-2'>
                <BaseInput
                  type='date'
                  name='dateInput'
                  label={t('common.date')}
                  blockFuture={true}
                  ref={dateRef}
                  isValid={isValidDate}
                  onChange={() => validateDate(nameRef.current.value)}
                  onBlur={() => validateDate(nameRef.current.value)}
                  readOnly={isReadOnly}
                />
                <div className='flex px-2'>
                  {!isValidDate ? (
                    <span className='text-red-500 flex items-center gap-2'>
                      <AlertIcon className='h-6 w-6' color='#ef4444' />
                      <span>{t('admin.common.field_required')}</span>
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 bg-thirdBgColor p-10'>
              <p className='text-xl'>{t('admin.common.desc_info')}</p>
              <div className='flex flex-col gap-2'>
                <BaseTextarea
                  rows='12'
                  label={t('common.description')}
                  secondLabel={t('common.description-max')}
                  ref={descRef}
                  maxLength={1000}
                  isValid={isValidDesc}
                  onChange={() => {
                    validateDescription(descRef.current.value);
                    handleDescChange();
                  }}
                  readOnly={isReadOnly}
                />
                <div className='flex justify-between px-2'>
                  {!isValidDesc ? (
                    <span className='text-red-500 flex items-center gap-2'>
                      <AlertIcon className='h-6 w-6' color='#ef4444' />
                      <span>{t('admin.common.field_required')}</span>
                    </span>
                  ) : (
                    <span></span>
                  )}
                  <span>{descLength} / 1000</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 bg-thirdBgColor p-10'>
              <p className='text-xl'>{t('common.useful_links')}</p>
              <div className='flex flex-col gap-2'>
                <div className='flex justify-center items-center gap-2'>
                  <WikiIcon />
                  <BaseInput
                    type='text'
                    name='wikiLinkInput'
                    ref={wikiLinkRef}
                    onChange={() => wikiLinkRef.current.value}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <WebIcon />
                  <BaseInput
                    type='text'
                    name='topicLinkInput'
                    ref={webLinkRef}
                    onChange={() => wikiLinkRef.current.value}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 bg-thirdBgColor p-10'>
              <p className='text-xl'>{t('admin.common.verification_info')}</p>
              <BaseRadioGroup
                options={verificationOptions}
                selectedValue={toVerification}
                onChange={handleVerificationChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className='w-1/2 h-3/4 flex flex-col gap-4'>
            <GoogleMap adminVersion={true} />
            <BaseImageUpload fileSize={5} />
          </div>
        </div>
        <hr />
        <div className='flex justify-end gap-4'>
          <BaseButton name={t('admin.common.back')} btnBg='red' onClick={() => navigate(-1)} />
          {action !== 'view' && (
            <BaseButton
              name={action === 'edit' ? t('admin.content.edit') : t('admin.common.add')}
              btnBg='blue'
              onClick={() => handleConfirm()}
              disabled={isReadOnly}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminTrailActionSection;