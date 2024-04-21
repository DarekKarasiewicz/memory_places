import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { addPlacelocationActions, selectAddPlaceLocation } from '../../Redux/addPlaceLocationSlice';
import { addPlaceActions } from '../../Redux/addPlaceSlice';
import { confirmationModalActions } from '../../Redux/confirmationModalSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import PinIcon from '../../icons/PinIcon';
import BaseInput from '../../Base/BaseInput';
import BaseTextarea from '../../Base/BaseTextarea';
import BaseButton from '../../Base/BaseButton';
import BaseSelect from '../../Base/BaseSelect';
import BaseRadioGroup from '../../Base/BaseRadioGroup';
import WebIcon from '../../icons/WebIcon';
import WikiIcon from '../../icons/WikiIcon';
import GoogleMap from '../../GoogleMap/GoogleMap';

function AdminPlaceActionSection({ action, placeId }) {
  const addPlaceLocation = useSelector(selectAddPlaceLocation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sortOf, setSortOf] = useState([]);
  const [type, setType] = useState([]);
  const [period, setPeriod] = useState([]);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const latRef = useRef(null);
  const lngRef = useRef(null);
  const dateRef = useRef(null);
  const sortOfRef = useRef(null);
  const typeRef = useRef(null);
  const periodRef = useRef(null);
  const wikiLinkRef = useRef(null);
  const webLinkRef = useRef(null);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [isValidName, setIsValidName] = useState(null);
  const [isValidDesc, setIsValidDesc] = useState(null);
  const [isValidLat, setIsValidLat] = useState(null);
  const [isValidLng, setIsValidLng] = useState(null);
  const [isValidDate, setIsValidDate] = useState(null);
  const [inputLength, setInputLength] = useState(0);
  const [descLength, setDescLength] = useState(0);
  const [toVerification, setToVerification] = useState('false');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [actionTitle, setActionTitle] = useState(t('admin.common.memo_place_add'));
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const fetchSortOfItems = async () => {
    try {
      const responseSort = await axios.get(`http://127.0.0.1:8000/admin_dashboard/sortofs`);
      setSortOf(
        responseSort.data
          .map((obj) => ({
            id: obj.id,
            label: obj.name,
            value: obj.id,
            text: obj.value,
            order: obj.order,
          }))
          .sort((a, b) => (a.order > b.order ? 1 : -1)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`http://127.0.0.1:8000/admin_dashboard/types`);
      setType(
        responseType.data
          .map((obj) => ({
            id: obj.id,
            label: obj.name,
            value: obj.id,
            text: obj.value,
            order: obj.order,
          }))
          .sort((a, b) => (a.order > b.order ? 1 : -1)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`http://127.0.0.1:8000/admin_dashboard/periods`);
      setPeriod(
        responsePeriod.data
          .map((obj) => ({
            id: obj.id,
            label: obj.name,
            value: obj.id,
            text: obj.value,
            order: obj.order,
          }))
          .sort((a, b) => (a.order > b.order ? 1 : -1)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (addPlaceLocation.lat || addPlaceLocation.lng) {
      validateLat(addPlaceLocation.lat);
      validateLng(addPlaceLocation.lng);
    }
    setLat(addPlaceLocation.lat);
    setLng(addPlaceLocation.lng);
  }, [addPlaceLocation]);

  useEffect(() => {
    if (action === 'edit' || action === 'view') {
      const getPlaceItems = async (placeId) => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/admin_dashboard/places/pk=${placeId}`,
          );
          console.log(response.data);

          nameRef.current.value = response.data.place_name;
          descRef.current.value = response.data.description;
          latRef.current.value = response.data.lat;
          lngRef.current.value = response.data.lng;
          dateRef.current.value = response.data.found_date;
          sortOfRef.current.value = response.data.sortof;
          typeRef.current.value = response.data.type;
          periodRef.current.value = response.data.period;
          wikiLinkRef.current.value = response.data.wiki_link;
          webLinkRef.current.value = response.data.topic_link;
          // setToVerification(response.data.verified)

          validateName(nameRef.current.value);
          validateLat(latRef.current.value);
          validateLng(lngRef.current.value);
          validateDescription(descRef.current.value);
          validateDate(dateRef.current.value);
        } catch (error) {
          console.log(error);
        }
      };

      if (action === 'edit') {
        ``;
        setActionTitle(t('admin.common.memo_place_edit'));
      }

      if (action === 'view') {
        setActionTitle(t('admin.common.memo_place_view'));
        setIsReadOnly(true);
      }

      getPlaceItems(placeId);
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

  const validateLat = (lat) => {
    const latRegex = /^(-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,})$/;
    return setIsValidLat(latRegex.test(lat));
  };

  const validateLng = (lng) => {
    const lngRegex = /^(-?((1[0-7]|[1-9]?)[0-9]|[0-9])\.{1}\d{1,})$/;
    return setIsValidLng(lngRegex.test(lng));
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

  const validateForm = () => {
    if (
      isValidName === true &&
      isValidDate === true &&
      isValidLat === true &&
      isValidLng === true &&
      isValidDesc === true
    ) {
      return true;
    }

    return false;
  };

  const handleSelectLocationBtn = () => {
    dispatch(addPlacelocationActions.changeIsSelecting({ isSelecting: true }));
  };

  const handleConfirm = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      if (action === 'edit') {
        axios
          .put(`http://127.0.0.1:8000/admin_dashboard/places/pk=${placeId}`, {
            place_name: nameRef.current.value,
            description: descRef.current.value,
            found_date: dateRef.current.value,
            lat: latRef.current.value,
            lng: lngRef.current.value,
            sortof: sortOfRef.current.value,
            type: typeRef.current.value,
            period: periodRef.current.value,
            wiki_link: wikiLinkRef.current.value,
            topic_link: webLinkRef.current.value,
            verified: toVerification,
          })
          .then((response) => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            navigate(-1);
            // console.log(response);
          })
          .catch((error) => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
            navigate(-1);
            // console.log(error);
          });
      } else {
        // console.log(wikiLinkRef.current.value);
        // console.log(webLinkRef.current.value);
        console.log(new Date().toJSON().slice(0, 10));
        axios
          .post(`http://127.0.0.1:8000/admin_dashboard/places/`, {
            user: user.user_id,
            place_name: nameRef.current.value,
            description: descRef.current.value,
            // creation_date: new Date().toJSON().slice(0, 10),
            found_date: dateRef.current.value,
            lat: latRef.current.value,
            lng: lngRef.current.value,
            sortof: sortOfRef.current.value,
            type: typeRef.current.value,
            period: periodRef.current.value,
            wiki_link: wikiLinkRef.current.value,
            topic_link: webLinkRef.current.value,
            verified: toVerification,
          })
          .then((response) => {
            dispatch(addPlaceActions.reset());
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            // console.log(response);
          })
          .catch((error) => {
            dispatch(addPlaceActions.reset());
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
            // console.log(error);
          });
      }
    } else {
      alert(t('modal.filled_box_error'));
    }
  };

  useEffect(() => {
    fetchSortOfItems();
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
                        <img
                          src='../../assets/alert_icon.svg'
                          alt='alert icon'
                          className='h-6 w-6'
                        />
                        <span>{t('admin.common.field_required')}</span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                    <span>{inputLength} / 50</span>
                  </div>
                </div>
                <div className='flex justify-start items-center gap-4'>
                  <BaseSelect
                    label={t('common.type_of')}
                    name={t('common.type_of')}
                    options={sortOf}
                    ref={sortOfRef}
                    onChange={() => sortOfRef.current.value}
                    readOnly={isReadOnly}
                  />
                  <BaseSelect
                    label={t('common.type')}
                    name={t('common.type')}
                    options={type}
                    ref={typeRef}
                    onChange={() => typeRef.current.value}
                    readOnly={isReadOnly}
                  />
                  <BaseSelect
                    label={t('common.period')}
                    name={t('common.period')}
                    options={period}
                    ref={periodRef}
                    onChange={() => periodRef.current.value}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 bg-thirdBgColor p-10'>
              <p className='text-xl'>{t('admin.common.lat_lng_info')}</p>
              <div className='flex gap-2'>
                <div className='w-1/2 flex flex-col gap-2'>
                  <BaseInput
                    type='number'
                    placeholder={t('common.latitude')}
                    name='lat'
                    label={t('common.latitude')}
                    ref={latRef}
                    value={lat}
                    isValid={isValidLat}
                    onChange={() => validateLat(latRef.current.value)}
                    onBlur={() => validateLat(latRef.current.value)}
                    readOnly={isReadOnly}
                  />
                  <div className='flex px-2'>
                    {!isValidLat ? (
                      <span className='text-red-500 flex items-center gap-2'>
                        <img
                          src='../../assets/alert_icon.svg'
                          alt='alert icon'
                          className='h-6 w-6'
                        />
                        <span>{t('admin.common.correct_info_data')}</span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className='w-1/2 flex flex-col gap-2'>
                  <BaseInput
                    type='number'
                    placeholder={t('common.longitude')}
                    name='lng'
                    label={t('common.longitude')}
                    ref={lngRef}
                    value={lng}
                    isValid={isValidLng}
                    onChange={() => validateLng(lngRef.current.value)}
                    onBlur={() => validateLng(lngRef.current.value)}
                    readOnly={isReadOnly}
                  />
                  <div className='flex px-2'>
                    {!isValidLng ? (
                      <span className='text-red-500 flex items-center gap-2'>
                        <img
                          src='../../assets/alert_icon.svg'
                          alt='alert icon'
                          className='h-6 w-6'
                        />
                        <span>{t('admin.common.correct_info_data')}</span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              </div>
              <p className='text-xl'>{t('admin.common.lat_lng_info2')}</p>
              <BaseButton
                name={t('common.location_select')}
                btnBg='blue'
                onClick={handleSelectLocationBtn}
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
                      <img src='../../assets/alert_icon.svg' alt='alert icon' className='h-6 w-6' />
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
                  rows='6'
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
                      <img src='../../assets/alert_icon.svg' alt='alert icon' className='h-6 w-6' />
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
          <div className='w-1/2 h-3/4'>
            <GoogleMap adminVersion={true} />
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

export default AdminPlaceActionSection;
