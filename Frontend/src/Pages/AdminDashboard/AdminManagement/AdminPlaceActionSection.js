import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { addPlacelocationActions, selectAddPlaceLocation } from 'Redux/addPlaceLocationSlice';
import { addTrailActions } from 'Redux/addTrailSlice';
import { addPlaceActions } from 'Redux/addPlaceSlice';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import { adminActions } from 'Redux/adminActionSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { adminDataActions } from 'Redux/adminDataSlice';
import { addObjectImageActions, selectAddObjectImage } from 'Redux/addObjectImageSlice';

import PinIcon from 'icons/PinIcon';
import BaseInput from 'Components/Base/BaseInput';
import BaseTextarea from 'Components/Base/BaseTextarea';
import BaseButton from 'Components/Base/BaseButton';
import BaseSelect from 'Components/Base/BaseSelect';
import BaseRadioGroup from 'Components/Base/BaseRadioGroup';
import WebIcon from 'icons/WebIcon';
import WikiIcon from 'icons/WikiIcon';
import AdminGoogleMap from './AdminGoogleMap';
import BaseImageUpload from 'Components/Base/BaseImageUpload/BaseImageUpload';
import AlertIcon from 'icons/AlertIcon';
import ImageSlider from 'Components/ImageSlider/ImageSlider';

import { registerAppChanges } from 'utils';
import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

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
  const [isValidSortof, setIsValidSortof] = useState(null);
  const [isValidType, setIsValidType] = useState(null);
  const [isValidPeriod, setIsValidPeriod] = useState(null);
  const [inputLength, setInputLength] = useState(0);
  const [descLength, setDescLength] = useState(0);
  const [toVerification, setToVerification] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [actionTitle, setActionTitle] = useState(t('admin.common.memo_place_add'));
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [currentAction, setCurrentAction] = useState('add');
  const [placePosition, setPlacePosition] = useState(null);
  const addObjectImageData = useSelector(selectAddObjectImage);
  const [baseImages, setBaseImages] = useState([]);
  const { fontSize } = useFontSize();

  const fetchSortOfItems = async () => {
    try {
      const responseSort = await axios.get(`http://127.0.0.1:8000/admin_dashboard/sortofs`);
      const sortOfItems = responseSort.data
        .map((obj) => ({
          id: obj.id,
          label: t(`modal.${obj.value}`),
          value: obj.id,
          order: obj.order,
        }))
        .sort((a, b) => (a.order > b.order ? 1 : -1));

      const idSet = new Set(sortOfItems.map((item) => item.id));

      if (!idSet.has(0)) {
        setSortOf([{ id: 0, label: t('modal.all'), value: 0 }, ...sortOfItems]);
      } else {
        setSortOf(sortOfItems);
      }
    } catch (error) {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

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
      const getPlaceItems = async (placeId) => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/admin_dashboard/places/pk=${placeId}`,
          );

          nameRef.current.value = response.data.place_name;
          descRef.current.value = response.data.description;
          latRef.current.value = response.data.lat;
          lngRef.current.value = response.data.lng;
          sortOfRef.current.value = response.data.sortof;
          typeRef.current.value = response.data.type;
          periodRef.current.value = response.data.period;
          wikiLinkRef.current.value = response.data.wiki_link;
          webLinkRef.current.value = response.data.topic_link;
          setToVerification(response.data.verified === true ? 'false' : 'true');

          setPlacePosition({ lat: response.data.lat, lng: response.data.lng });

          getPlaceImages(placeId)
            .then((imageData) => {
              const modifiedImageData = imageData.map((image) => ({
                ...image,
                name: image.img.split('/').pop(),
              }));

              setBaseImages(modifiedImageData);
              dispatch(addObjectImageActions.setImages(modifiedImageData));
            })
            .catch((error) => {
              console.error('Error fetching place images:', error);
            });

          validateName(nameRef.current.value);
          validateLat(latRef.current.value);
          validateLng(lngRef.current.value);
          validateDescription(descRef.current.value);
          validateSortof(sortOfRef.current.value);
          validateType(typeRef.current.value);
          validatePeriod(periodRef.current.value);
        } catch (error) {
          dispatch(notificationModalActions.changeType('alert'));
          dispatch(notificationModalActions.changeTitle(t('admin.content.alert_error')));
          dispatch(notificationModalActions.changeIsNotificationModalOpen());
        }
      };

      if (action === 'edit') {
        setActionTitle(t('admin.common.memo_place_edit'));
        setCurrentAction(action);
      }

      if (action === 'view') {
        setActionTitle(t('admin.common.memo_place_view'));
        setIsReadOnly(true);
        setCurrentAction(action);
      }

      getPlaceItems(placeId);
    }
    dispatch(addPlacelocationActions.clearLocation());
    dispatch(addTrailActions.reset());
  }, [action]);

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

  const validateSortof = (sortof) => {
    if (sortof !== '0') {
      return setIsValidSortof(true);
    }
    return setIsValidSortof(false);
  };

  const validateType = (type) => {
    if (type !== '0') {
      return setIsValidType(true);
    }
    return setIsValidType(false);
  };

  const validatePeriod = (period) => {
    if (period !== '0') {
      return setIsValidPeriod(true);
    }
    return setIsValidPeriod(false);
  };

  const validateForm = () => {
    if (
      isValidName === true &&
      isValidLat === true &&
      isValidLng === true &&
      isValidDesc === true &&
      isValidSortof === true &&
      isValidType === true &&
      isValidPeriod === true
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (addPlaceLocation.lat || addPlaceLocation.lng) {
      validateLat(addPlaceLocation.lat);
      validateLng(addPlaceLocation.lng);
    }
    setLat(addPlaceLocation.lat);
    setLng(addPlaceLocation.lng);
  }, [addPlaceLocation]);

  const handleSelectLocationBtn = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    dispatch(adminActions.changeAdminGoogleMapExtension(true));
    dispatch(addPlacelocationActions.changeIsSelecting({ isSelecting: true }));
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    dispatch(addObjectImageActions.reset());
    navigate(-1);
  };

  const sendPlaceImages = (placeId, image) => {
    const formData = new FormData();
    formData.append('place', placeId);
    formData.append('img', image);

    axios
      .post(`http://localhost:8000/memo_places/place_image/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {})
      .catch(() => {});
  };

  const deletePlaceImages = (imageId) => {
    axios
      .delete(`http://localhost:8000/memo_places/place_image/pk=${imageId}/`)
      .then(() => {})
      .catch(() => {});
  };

  const getPlaceImages = async (placeId) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/memo_places/place_image/place=${placeId}`,
    );

    return response.data;
  };

  const findImageChanges = (oldItems, newItems) => {
    return oldItems.filter((item) => !newItems.includes(item));
  };

  const findImagesWithoutId = (newArray) => {
    return newArray.filter((newItem) => !newItem.id);
  };

  const handleConfirm = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      const currentDate = new Date();
      const shouldBeVerificated = toVerification === 'true';
      const setValidationDate = shouldBeVerificated ? null : currentDate.toISOString().slice(0, 10);

      if (action === 'edit') {
        const itemsToDelete = findImageChanges(baseImages, addObjectImageData.images);
        const itemsToAdd = findImagesWithoutId(addObjectImageData.images);

        itemsToDelete.forEach((image) => {
          deletePlaceImages(image.id);
        });

        itemsToAdd.forEach((image) => {
          sendPlaceImages(placeId, image);
        });

        axios
          .put(`http://127.0.0.1:8000/admin_dashboard/places/${placeId}/`, {
            place_name: nameRef.current.value,
            description: descRef.current.value,
            lat: latRef.current.value,
            lng: lngRef.current.value,
            sortof: sortOfRef.current.value,
            type: typeRef.current.value,
            period: periodRef.current.value,
            wiki_link: wikiLinkRef.current.value,
            topic_link: webLinkRef.current.value,
            verified: !shouldBeVerificated,
            verified_date: setValidationDate,
          })
          .then(() => {
            dispatch(addObjectImageActions.reset());
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            registerAppChanges('admin.changes_messages.place_edit', user, placeId);
            navigate('/adminDashboard');
          })
          .catch(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
            navigate('/adminDashboard');
          });
      } else {
        axios
          .post(`http://127.0.0.1:8000/admin_dashboard/places/`, {
            user: user.user_id,
            place_name: nameRef.current.value,
            description: descRef.current.value,
            lat: latRef.current.value,
            lng: lngRef.current.value,
            sortof: sortOfRef.current.value,
            type: typeRef.current.value,
            period: periodRef.current.value,
            wiki_link: wikiLinkRef.current.value,
            topic_link: webLinkRef.current.value,
            verified: !shouldBeVerificated,
            verified_date: setValidationDate,
          })
          .then((response) => {
            addObjectImageData.images.forEach((image) => {
              sendPlaceImages(response.data.id, image);
            });

            dispatch(addObjectImageActions.reset());
            dispatch(addPlaceActions.reset());
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            dispatch(adminDataActions.updateIsPlacesChanged(true));
            registerAppChanges('admin.changes_messages.place_add', user, nameRef.current.value);
            navigate('/adminDashboard');
          })
          .catch(() => {
            dispatch(addPlaceActions.reset());
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
    fetchSortOfItems();
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <>
      <div className='px-24 py-12 bg-secondaryBgColor text-textColor min-h-[calc(100vh-5rem)] flex flex-col gap-6 h-full relative'>
        <div
          className={`flex justify-start ml-6 items-center gap-4 text-${fontSize}-4xl font-bold`}
        >
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
                  <div className={`flex justify-between px-2 text-${fontSize}-base`}>
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
                  <div className='flex flex-col gap-2 w-1/3'>
                    <BaseSelect
                      label={t('common.type_of')}
                      name={t('common.type_of')}
                      options={sortOf}
                      ref={sortOfRef}
                      onChange={() => {
                        validateSortof(sortOfRef.current.value);
                      }}
                      onBlur={() => validateSortof(sortOfRef.current.value)}
                      readOnly={isReadOnly}
                      isValid={isValidSortof}
                    />
                    {!isValidSortof ? (
                      <span className='text-red-500 flex items-center gap-2'>
                        <AlertIcon className='h-6 w-6' color='#ef4444' />
                        <span className={`text-${fontSize}-base`}>
                          {t('admin.common.field_required')}
                        </span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className='flex flex-col gap-2 w-1/3'>
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
                        <span className={`text-${fontSize}-base`}>
                          {t('admin.common.field_required')}
                        </span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className='flex flex-col gap-2 w-1/3'>
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
                        <span className={`text-${fontSize}-base`}>
                          {t('admin.common.field_required')}
                        </span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 bg-thirdBgColor p-10'>
              <p className={`text-${fontSize}-xl`}>{t('admin.common.lat_lng_info')}</p>
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
                        <AlertIcon className='h-6 w-6' color='#ef4444' />
                        <span className={`text-${fontSize}-base`}>
                          {t('admin.common.correct_info_data')}
                        </span>
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
                        <AlertIcon className='h-6 w-6' color='#ef4444' />
                        <span className={`text-${fontSize}-base`}>
                          {t('admin.common.correct_info_data')}
                        </span>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              </div>
              <p className={`text-${fontSize}-xl`}>{t('admin.common.lat_lng_info2')}</p>
              <BaseButton
                breakWidth={true}
                className='w-fit'
                name={t('common.location_select')}
                btnBg='blue'
                onClick={handleSelectLocationBtn}
                disabled={isReadOnly}
              />
            </div>
            <div className='flex flex-col gap-4 bg-thirdBgColor p-10'>
              <p className={`text-${fontSize}-xl`}>{t('admin.common.desc_info')}</p>
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
                <div className={`flex justify-between px-2 text-${fontSize}-base`}>
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
              <p className={`text-${fontSize}-xl`}>{t('common.useful_links')}</p>
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
              <p className={`text-${fontSize}-xl`}>{t('admin.common.verification_info')}</p>
              <BaseRadioGroup
                options={verificationOptions}
                selectedValue={toVerification}
                onChange={handleVerificationChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className='w-1/2 h-3/4 flex flex-col gap-4'>
            <AdminGoogleMap action={currentAction} placePosition={placePosition} kind='place' />
            {action !== 'view' ? (
              <BaseImageUpload fileSize={5} />
            ) : (
              <div className='h-1/2'>
                <ImageSlider slides={baseImages} />
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className='flex justify-end gap-4'>
          <BaseButton
            name={t('admin.common.back')}
            btnBg='red'
            onClick={() => handleModalClose()}
          />
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
