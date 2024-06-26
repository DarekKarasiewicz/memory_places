import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { addPlacelocationActions, selectAddPlaceLocation } from 'Redux/addPlaceLocationSlice';
import { modalsActions } from 'Redux/modalsSlice';
import { selectUpdatePlace, updatePlaceActions } from 'Redux/updatePlaceSlice';
import { addPlaceActions, selectAddPlace } from 'Redux/addPlaceSlice';
import { addObjectImageActions, selectAddObjectImage } from 'Redux/addObjectImageSlice';
import { formValidationActions, selectFormValidation } from 'Redux/formValidationSlice';
import { addPlace, deletePlace } from 'Redux/allMapPlacesSlice';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import { userPlacesActions } from 'Redux/userPlacesSlice';

import AlertIcon from 'icons/AlertIcon';
import BaseModal from 'Components/Base/BaseModal';
import BaseInput from 'Components/Base/BaseInput';
import BaseTextarea from 'Components/Base/BaseTextarea';
import BaseButton from 'Components/Base/BaseButton';
import BaseSelect from 'Components/Base/BaseSelect';
import BaseImageUpload from 'Components/Base/BaseImageUpload/BaseImageUpload';
import WebIcon from 'icons/WebIcon';
import WikiIcon from 'icons/WikiIcon';

import { registerAppChanges } from 'utils';
import { useFontSize } from 'Components/FontSizeSwitcher/FontSizeContext';

function FormModal(props) {
  const addPlaceLocation = useSelector(selectAddPlaceLocation);
  const formValidation = useSelector(selectFormValidation);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();
  const descriptionRef = useRef();
  const sortofRef = useRef();
  const typeRef = useRef();
  const periodRef = useRef();
  const wikiLinkRef = useRef();
  const topicLinkRef = useRef();
  const updatePlaceData = useSelector(selectUpdatePlace);
  const addPlaceData = useSelector(selectAddPlace);
  const addObjectImageData = useSelector(selectAddObjectImage);
  const [baseImages, setBaseImages] = useState([]);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const { t } = useTranslation();
  const [sortOf, setSortOf] = useState([]);
  const [type, setType] = useState([]);
  const [period, setPeriod] = useState([]);
  const [inputLength, setInputLength] = useState(0);
  const [descLength, setDescLength] = useState(0);
  const { fontSize } = useFontSize();
  const appPath = process.env.REACT_APP_URL_PATH;

  const fetchSortOfItems = async () => {
    try {
      const responseSort = await axios.get(`${appPath}/memo_places/sortofs`);
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
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`${appPath}/memo_places/types`);
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
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`${appPath}/memo_places/periods`);
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
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    fetchSortOfItems();
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  useEffect(() => {
    if (updatePlaceData.isDataLoaded === true || props.type !== 'update') {
      if (addPlaceLocation.lat || addPlaceLocation.lng) {
        validateLat(addPlaceLocation.lat);
        validateLng(addPlaceLocation.lng);
      }
      setLat(addPlaceLocation.lat);
      setLng(addPlaceLocation.lng);
    }
  }, []);

  useEffect(() => {
    if (props.type === 'update' && updatePlaceData.isDataLoaded === false) {
      dispatch(addPlaceActions.changeName(updatePlaceData.place.place_name));
      dispatch(addPlaceActions.changeDescription(updatePlaceData.place.description));
      setLat(updatePlaceData.place.lat);
      setLng(updatePlaceData.place.lng);
      dispatch(addPlaceActions.changeSortOf(updatePlaceData.place.sortof));
      dispatch(addPlaceActions.changeType(updatePlaceData.place.type));
      dispatch(addPlaceActions.changePeriod(updatePlaceData.place.period));
      dispatch(addPlaceActions.changeWikiLink(updatePlaceData.place.wiki_link));
      dispatch(addPlaceActions.changeTopicLink(updatePlaceData.place.topic_link));
      validateName(updatePlaceData.place.place_name);
      validateDescription(updatePlaceData.place.description);
      validateLat(updatePlaceData.place.lat);
      validateLng(updatePlaceData.place.lng);
      dispatch(formValidationActions.changeIsValidSortof(updatePlaceData.place.sortof !== '0'));
      dispatch(formValidationActions.changeIsValidType(updatePlaceData.place.type !== '0'));
      dispatch(formValidationActions.changeIsValidPeriod(updatePlaceData.place.period !== '0'));

      getPlaceImages(updatePlaceData.place.id)
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

      dispatch(updatePlaceActions.dataIsLoaded());

      setInputLength(updatePlaceData.place.place_name.length);
      setDescLength(updatePlaceData.place.description.length);
    }
  }, [props.type, updatePlaceData.isDataLoaded]);

  const validateForm = () => {
    if (
      formValidation.isValidName === true &&
      formValidation.isValidLat === true &&
      formValidation.isValidLng === true &&
      formValidation.isValidType === true &&
      formValidation.isValidSortof === true &&
      formValidation.isValidPeriod === true &&
      formValidation.isValidDescription === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validateName = (name) => {
    const nameRegex = /[\w'():-]+/;
    dispatch(formValidationActions.changeIsValidName(nameRegex.test(name)));
  };

  const validateLat = (lat) => {
    const latRegex = /^(-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,})$/;
    dispatch(formValidationActions.changeIsValidLat(latRegex.test(lat)));
  };

  const validateLng = (lng) => {
    const lngRegex = /^(-?((1[0-7]|[1-9]?)[0-9]|[0-9])\.{1}\d{1,})$/;
    dispatch(formValidationActions.changeIsValidLng(lngRegex.test(lng)));
  };

  const validateDescription = (desc) => {
    if (desc.length > 0) {
      dispatch(formValidationActions.changeIsValidDescription(true));
    } else {
      dispatch(formValidationActions.changeIsValidDescription(false));
    }
  };

  const handleNameChange = () => {
    if (nameRef.current) {
      const length = nameRef.current.value.length;
      setInputLength(length);
    }
  };

  const handleDescChange = () => {
    if (descriptionRef.current) {
      const length = descriptionRef.current.value.length;
      setDescLength(length);
    }
  };

  useEffect(() => {
    if (props.type !== 'update') {
      handleNameChange();
      handleDescChange();
    }
  }, []);

  const handleModalClose = () => {
    dispatch(addObjectImageActions.reset());
    props.closeModal();
  };

  const sendPlaceImages = (placeId, image) => {
    const formData = new FormData();
    formData.append('place', placeId);
    formData.append('img', image);

    axios
      .post(`${appPath}/memo_places/place_image/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {})
      .catch(() => {});
  };

  const deletePlaceImages = (imageId) => {
    axios
      .delete(`${appPath}/memo_places/place_image/${imageId}/`)
      .then(() => {})
      .catch(() => {});
  };

  const getPlaceImages = async (placeId) => {
    const response = await axios.get(`${appPath}/place_image/place=${placeId}`);

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
      if (props.type === 'update') {
        const itemsToDelete = findImageChanges(baseImages, addObjectImageData.images);
        const itemsToAdd = findImagesWithoutId(addObjectImageData.images);

        itemsToDelete.forEach((image) => {
          deletePlaceImages(image.id);
        });

        itemsToAdd.forEach((image) => {
          sendPlaceImages(updatePlaceData.place.id, image);
        });

        axios
          .put(`${appPath}/memo_places/places/${updatePlaceData.place.id}/`, {
            place_name: addPlaceData.place_name,
            description: addPlaceData.description,
            lat: lat,
            lng: lng,
            sortof: addPlaceData.sortof,
            type: addPlaceData.type,
            period: addPlaceData.period,
            wiki_link: addPlaceData.wiki_link,
            topic_link: addPlaceData.topic_link,
          })
          .then((response) => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            registerAppChanges('admin.changes_messages.place_edit', user, updatePlaceData.place.id);
            dispatch(deletePlace(response.data.id));
            dispatch(addPlace(response.data));
            dispatch(addPlaceActions.reset());
            dispatch(addObjectImageActions.reset());
            dispatch(updatePlaceActions.reset());
            dispatch(addPlacelocationActions.clearLocation());
            dispatch(modalsActions.changeIsUpdateModalOpen());
            dispatch(formValidationActions.reset());
            dispatch(userPlacesActions.changeIsOpen());
          })
          .catch(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
          });
      } else {
        axios
          .post(`${appPath}/memo_places/places/`, {
            user: user.user_id,
            place_name: addPlaceData.place_name,
            description: addPlaceData.description,
            lat: lat,
            lng: lng,
            sortof: parseInt(addPlaceData.sortof),
            type: parseInt(addPlaceData.type),
            period: parseInt(addPlaceData.period),
            wiki_link: addPlaceData.wiki_link,
            topic_link: addPlaceData.topic_link,
          })
          .then((response) => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            registerAppChanges('admin.changes_messages.place_add', user, addPlaceData.place_name);
            dispatch(addPlace(response.data));

            addObjectImageData.images.forEach((image) => {
              sendPlaceImages(response.data.id, image);
            });

            dispatch(addPlaceActions.reset());
            dispatch(addObjectImageActions.reset());
            dispatch(addPlacelocationActions.clearLocation());
            dispatch(modalsActions.changeIsFormModalOpen());
            dispatch(formValidationActions.reset());
          })
          .catch(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
          });
      }
    } else {
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('modal.filled_box_error')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  const handleSelectLocationBtn = () => {
    dispatch(addPlacelocationActions.changeIsSelecting({ isSelecting: true }));
    if (props.type === 'update') {
      dispatch(modalsActions.changeIsUpdateModalOpen());
    } else {
      dispatch(modalsActions.changeIsFormModalOpen());
    }
  };

  return (
    <>
      <BaseModal title={props.title} closeModal={props.closeModal}>
        <div className='px-2 py-4 max-h-[80vh] overflow-y-auto flex gap-4'>
          <div className='flex flex-col gap-2 w-2/5'>
            <div className='flex flex-col gap-2'>
              <BaseInput
                type='number'
                name='lat'
                label={t('common.latitude')}
                value={lat}
                ref={latRef}
                onBlur={() => {
                  setLat(latRef.current.value);
                  validateLat(lat);
                }}
                onChange={() => {
                  setLat(latRef.current.value);
                  validateLat(lat);
                }}
                isValid={formValidation.isValidLat}
              />
              {formValidation.isValidLat === false && (
                <span className='text-red-500 flex items-center gap-2'>
                  <AlertIcon className='h-6 w-6' color='#ef4444' />
                  <span className={`text-${fontSize}-base`}>
                    {t('admin.common.field_required')}
                  </span>
                </span>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <BaseInput
                type='number'
                name='lng'
                label={t('common.longitude')}
                value={lng}
                ref={lngRef}
                onBlur={() => {
                  setLng(lngRef.current.value);
                  validateLng(lng);
                }}
                onChange={() => {
                  setLng(lngRef.current.value);
                  validateLng(lngRef);
                }}
                isValid={formValidation.isValidLng}
              />
              {formValidation.isValidLng === false && (
                <span className='text-red-500 flex items-center gap-2'>
                  <AlertIcon className='h-6 w-6' color='#ef4444' />
                  <span className={`text-${fontSize}-base`}>
                    {t('admin.common.field_required')}
                  </span>
                </span>
              )}
            </div>
            <div className='px-2 pb-2 flex flex-col justify-center items-center gap-2'>
              <span className={`text-${fontSize}-base`}>{t('common.or2')}</span>
              <BaseButton
                breakWidth={true}
                name={t('common.location_select')}
                btnBg='blue'
                onClick={handleSelectLocationBtn}
              />
            </div>
            <hr className='border-textColor' />
            <div className='flex flex-col gap-2'>
              <BaseSelect
                label={t('common.type_of')}
                name={t('common.type_of')}
                value={addPlaceData.sortof}
                options={sortOf}
                ref={sortofRef}
                onBlur={() => {
                  dispatch(addPlaceActions.changeSortOf(sortofRef.current.value));
                  dispatch(
                    formValidationActions.changeIsValidSortof(sortofRef.current.value !== '0'),
                  );
                }}
                onChange={() => {
                  dispatch(addPlaceActions.changeSortOf(sortofRef.current.value));
                  dispatch(
                    formValidationActions.changeIsValidSortof(sortofRef.current.value !== '0'),
                  );
                }}
                isValid={formValidation.isValidSortof}
              />
              {formValidation.isValidSortof === false && (
                <span className='text-red-500 flex items-center gap-2'>
                  <AlertIcon className='h-6 w-6' color='#ef4444' />
                  <span className={`text-${fontSize}-base`}>
                    {t('admin.common.field_required')}
                  </span>
                </span>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <BaseSelect
                label={t('common.type')}
                name={t('common.type')}
                value={addPlaceData.type}
                options={type}
                ref={typeRef}
                onBlur={() => {
                  dispatch(addPlaceActions.changeType(typeRef.current.value));
                  dispatch(formValidationActions.changeIsValidType(typeRef.current.value !== '0'));
                }}
                onChange={() => {
                  dispatch(addPlaceActions.changeType(typeRef.current.value));
                  dispatch(formValidationActions.changeIsValidType(typeRef.current.value !== '0'));
                }}
                isValid={formValidation.isValidType}
              />
              {formValidation.isValidType === false && (
                <span className='text-red-500 flex items-center gap-2'>
                  <AlertIcon className='h-6 w-6' color='#ef4444' />
                  <span className={`text-${fontSize}-base`}>
                    {t('admin.common.field_required')}
                  </span>
                </span>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <BaseSelect
                label={t('common.period')}
                name={t('common.period')}
                value={addPlaceData.period}
                options={period}
                ref={periodRef}
                onBlur={() => {
                  dispatch(addPlaceActions.changePeriod(periodRef.current.value));
                  dispatch(
                    formValidationActions.changeIsValidPeriod(periodRef.current.value !== '0'),
                  );
                }}
                onChange={() => {
                  dispatch(addPlaceActions.changePeriod(periodRef.current.value));
                  dispatch(
                    formValidationActions.changeIsValidPeriod(periodRef.current.value !== '0'),
                  );
                }}
                isValid={formValidation.isValidPeriod}
              />
              {formValidation.isValidPeriod === false ? (
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
            <div className='mt-1 flex flex-col gap-1'>
              <p className={`text-${fontSize}-base`}>{t('common.useful_links')}</p>
              <div className='flex justify-center items-center gap-2'>
                <WikiIcon />
                <BaseInput
                  type='text'
                  name='wikiLinkInput'
                  maxLength={2048}
                  value={addPlaceData.wiki_link}
                  onBlur={() => {
                    dispatch(addPlaceActions.changeWikiLink(wikiLinkRef.current.value));
                  }}
                  ref={wikiLinkRef}
                />
              </div>
              <div className='flex justify-center items-center gap-2'>
                <WebIcon />
                <BaseInput
                  type='text'
                  name='topicLinkInput'
                  maxLength={2048}
                  value={addPlaceData.topic_link}
                  onBlur={() => {
                    dispatch(addPlaceActions.changeTopicLink(topicLinkRef.current.value));
                  }}
                  ref={topicLinkRef}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 w-3/5'>
            <div className='flex flex-col gap-2'>
              <BaseInput
                type='text'
                name='nameInput'
                label={t('common.name')}
                value={addPlaceData.place_name}
                maxLength={64}
                onBlur={() => {
                  dispatch(addPlaceActions.changeName(nameRef.current.value));
                  validateName(nameRef.current.value);
                }}
                onChange={() => {
                  validateName(nameRef.current.value);
                  handleNameChange();
                }}
                ref={nameRef}
                isValid={formValidation.isValidName}
              />
              <div className={`flex justify-between px-2 text-${fontSize}-base`}>
                {formValidation.isValidName === false ? (
                  <span className='text-red-500 flex items-center gap-2'>
                    <AlertIcon className='h-6 w-6' color='#ef4444' />
                    <span>{t('admin.common.field_required')}</span>
                  </span>
                ) : (
                  <span></span>
                )}
                <span>{inputLength} / 64</span>
              </div>
            </div>
            <BaseImageUpload fileSize={5} />
            <div className='flex flex-col gap-2'>
              <BaseTextarea
                rows='12'
                label={t('common.description')}
                secondLabel={t('common.max_length', { value: 1000 })}
                maxLength={1000}
                ref={descriptionRef}
                value={addPlaceData.description}
                onBlur={() => {
                  dispatch(addPlaceActions.changeDescription(descriptionRef.current.value));
                  validateDescription(descriptionRef.current.value);
                }}
                onChange={() => {
                  validateDescription(descriptionRef.current.value);
                  handleDescChange();
                }}
                isValid={formValidation.isValidDescription}
              />
              <div className={`flex justify-between px-2 text-${fontSize}-base`}>
                {formValidation.isValidDescription === false ? (
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
        </div>
        <div className='p-2 flex gap-4 justify-center'>
          <BaseButton name={t('common.cancel')} btnBg='red' onClick={() => handleModalClose()} />
          <BaseButton name={t('common.confirm')} btnBg='blue' onClick={handleConfirm} />
        </div>
      </BaseModal>
    </>
  );
}

export default FormModal;
