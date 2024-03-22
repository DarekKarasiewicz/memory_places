import { useState, useEffect, useRef, Fragment, useMemo } from 'react';
import axios from 'axios';
import BaseModal from '../Base/BaseModal';
import BaseInput from '../Base/BaseInput';
import BaseTextarea from '../Base/BaseTextarea';
import BaseButton from '../Base/BaseButton';
import BaseSelect from '../Base/BaseSelect';
import { useSelector, useDispatch } from 'react-redux';
import { addPlacelocationActions, selectAddPlaceLocation } from '../Redux/addPlaceLocationSlice';
import { modalsActions } from '../Redux/modalsSlice';
import { selectUpdatePlace, updatePlaceActions } from '../Redux/updatePlaceSlice';
import { addPlaceActions, selectAddPlace } from '../Redux/addPlaceSlice';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { formValidationActions, selectFormValidation } from '../Redux/formValidationSlice';
import { addPlace, deletePlace } from '../Redux/allMapPlacesSlice';
import BaseImageUpload from '../Base/BaseImageUpload/BaseImageUpload';

function FormModal(props) {
  const addPlaceLocation = useSelector(selectAddPlaceLocation);
  const formValidation = useSelector(selectFormValidation);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const dateRef = useRef();
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
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const { t } = useTranslation();

  const sortof_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.existing'), value: 'existing' },
    { label: t('modal.non_existing'), value: 'non_existing' },
    { label: t('modal.commemorative_plaque'), value: 'commemorative_plaque' },
    { label: t('modal.commemorative_monument'), value: 'commemorative_monument' },
  ];

  const type_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.war_cemetery'), value: 'war_cemetery' },
    { label: t('modal.civil_cemetery'), value: 'civil_cemetery' },
    { label: t('modal.burial_site'), value: 'burial_site' },
    { label: t('modal.execution_site'), value: 'execution_site' },
    { label: t('modal.battlefield'), value: 'battlefield' },
    { label: t('modal.archaeological_site'), value: 'archaeological_site' },
    { label: t('modal.wayside_shrine'), value: 'wayside_shrine' },
    { label: t('modal.historical_monument'), value: 'historical_monument' },
  ];

  const period_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.poland_before_third_partition'), value: 'poland_before_third_partition' },
    { label: t('modal.napoleonic_wars'), value: 'napoleonic_wars' },
    { label: t('modal.poland_after_partitions'), value: 'poland_after_partitions' },
    { label: t('modal.world_war_I'), value: 'world_war_I' },
    { label: t('modal.interwar_period'), value: 'interwar_period' },
    { label: t('modal.world_war_II'), value: 'world_war_II' },
    { label: t('modal.stalinist_period'), value: 'stalinist_period' },
  ];

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
      dispatch(addPlaceActions.changeFoundDate(updatePlaceData.place.found_date));
      setLat(updatePlaceData.place.lat);
      setLng(updatePlaceData.place.lng);
      dispatch(addPlaceActions.changeSortOf(updatePlaceData.place.sortof));
      dispatch(addPlaceActions.changeType(updatePlaceData.place.type));
      dispatch(addPlaceActions.changePeriod(updatePlaceData.place.period));
      dispatch(addPlaceActions.changeWikiLink(updatePlaceData.place.wiki_link));
      dispatch(addPlaceActions.changeTopicLink(updatePlaceData.place.topic_link));
      validateName(updatePlaceData.place.place_name);
      validateDescription(updatePlaceData.place.description);
      dispatch(formValidationActions.changeIsValidDate(isNaN(updatePlaceData.place.found_date)));
      validateLat(updatePlaceData.place.lat);
      validateLng(updatePlaceData.place.lng);
      dispatch(formValidationActions.changeIsValidSortof(updatePlaceData.place.sortof !== 'all'));
      dispatch(formValidationActions.changeIsValidType(updatePlaceData.place.type !== 'all'));
      dispatch(formValidationActions.changeIsValidPeriod(updatePlaceData.place.period !== 'all'));
      dispatch(updatePlaceActions.dataIsLoaded());
    }
  }, []);

  const validateForm = () => {
    if (
      formValidation.isValidName === true &&
      formValidation.isValidDate === true &&
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

  const handleConfirm = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      if (props.type === 'update') {
        axios
          .put(`http://localhost:8000/memo_places/places/${updatePlaceData.place.id}/`, {
            place_name: addPlaceData.place_name,
            description: addPlaceData.description,
            found_date: addPlaceData.found_date,
            lat: lat,
            lng: lng,
            sortof: addPlaceData.sortof,
            type: addPlaceData.type,
            period: addPlaceData.period,
            wiki_link: addPlaceData.wiki_link,
            topic_link: addPlaceData.topic_link,
          })
          .then((response) => {
            dispatch(deletePlace(response.data.id));
            dispatch(addPlace(response.data));
            dispatch(addPlaceActions.reset());
            dispatch(updatePlaceActions.reset());
            dispatch(addPlacelocationActions.clearLocation());
            dispatch(modalsActions.changeIsUpdateModalOpen());
            dispatch(formValidationActions.reset());
          });
      } else {
        axios
          .post(`http://localhost:8000/memo_places/places/`, {
            user: user.user_id,
            place_name: addPlaceData.place_name,
            description: addPlaceData.description,
            found_date: addPlaceData.found_date,
            lat: lat,
            lng: lng,
            sortof: addPlaceData.sortof,
            type: addPlaceData.type,
            period: addPlaceData.period,
            wiki_link: addPlaceData.wiki_link,
            topic_link: addPlaceData.topic_link,
          })
          .then((response) => {
            dispatch(addPlace(response.data));
            dispatch(addPlaceActions.reset());
            dispatch(addPlacelocationActions.clearLocation());
            dispatch(modalsActions.changeIsFormModalOpen());
            dispatch(formValidationActions.reset());
          });
      }
    } else {
      alert(t('modal.filled_box_error'));
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
        <div className='p-2 max-h-[75vh] overflow-y-auto'>
          <BaseInput
            type='text'
            name='nameInput'
            label={t('common.name')}
            value={addPlaceData.place_name}
            onBlur={() => {
              dispatch(addPlaceActions.changeName(nameRef.current.value));
              validateName(nameRef.current.value);
            }}
            onChange={() => {
              validateName(nameRef.current.value);
            }}
            ref={nameRef}
            isValid={formValidation.isValidName}
          />
          {formValidation.isValidName === false && (
            <p className='text-red-500 text-sm'>{t('common.illegal_characters')}</p>
          )}
          <BaseInput
            type='date'
            name='dateInput'
            label={t('common.date')}
            blockFuture={true}
            ref={dateRef}
            value={addPlaceData.found_date}
            onBlur={() => {
              dispatch(addPlaceActions.changeFoundDate(dateRef.current.value));
              dispatch(formValidationActions.changeIsValidDate(isNaN(dateRef.current.value)));
            }}
            onChange={() => {
              dispatch(formValidationActions.changeIsValidDate(isNaN(dateRef.current.value)));
            }}
            isValid={formValidation.isValidDate}
          />
          <BaseImageUpload />
          <div className='flex gap-8'>
            <BaseInput
              type='number'
              placeholder={t('common.latitude')}
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
            <BaseInput
              type='number'
              placeholder={t('common.longitude')}
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
          </div>
          <div className='p-2 flex justify-center mt-2'>
            <BaseButton
              name={t('common.location_select')}
              btnBg='blue'
              onClick={handleSelectLocationBtn}
            />
          </div>
          <div className='flex gap-8'>
            <BaseSelect
              label={t('common.type_of')}
              name={t('common.type_of')}
              value={
                props.type === 'update' && !updatePlaceData.isDataLoaded
                  ? updatePlaceData.place.sortof
                  : addPlaceData.sortof
              }
              options={sortof_options}
              ref={sortofRef}
              onBlur={() => {
                dispatch(addPlaceActions.changeSortOf(sortofRef.current.value));
                dispatch(
                  formValidationActions.changeIsValidSortof(sortofRef.current.value !== 'all'),
                );
              }}
              onChange={() => {
                dispatch(
                  formValidationActions.changeIsValidSortof(sortofRef.current.value !== 'all'),
                );
              }}
              isValid={formValidationActions.isValidSortof}
            />
            <BaseSelect
              label={t('common.type')}
              name={t('common.type')}
              value={
                props.type === 'update' && !updatePlaceData.isDataLoaded
                  ? updatePlaceData.place.type
                  : addPlaceData.type
              }
              options={type_options}
              ref={typeRef}
              onBlur={() => {
                dispatch(addPlaceActions.changeType(typeRef.current.value));
                dispatch(formValidationActions.changeIsValidType(typeRef.current.value !== 'all'));
              }}
              onChange={() => {
                dispatch(formValidationActions.changeIsValidType(typeRef.current.value !== 'all'));
              }}
              isValid={formValidation.isValidType}
            />
          </div>
          <BaseSelect
            label={t('common.period')}
            name={t('common.period')}
            value={
              props.type === 'update' && !updatePlaceData.isDataLoaded
                ? updatePlaceData.place.period
                : addPlaceData.period
            }
            options={period_options}
            ref={periodRef}
            onBlur={() => {
              dispatch(addPlaceActions.changePeriod(periodRef.current.value));
              dispatch(
                formValidationActions.changeIsValidPeriod(periodRef.current.value !== 'all'),
              );
            }}
            onChange={() => {
              dispatch(
                formValidationActions.changeIsValidPeriod(periodRef.current.value !== 'all'),
              );
            }}
            isValid={formValidation.isValidPeriod}
          />
          <BaseTextarea
            rows='6'
            label={t('common.description')}
            secondLabel={t('common.description-max')}
            maxLength={1000}
            ref={descriptionRef}
            value={addPlaceData.description}
            onBlur={() => {
              dispatch(addPlaceActions.changeDescription(descriptionRef.current.value));
              validateDescription(descriptionRef.current.value);
            }}
            onChange={() => {
              validateDescription(descriptionRef.current.value);
            }}
            isValid={formValidation.isValidDescription}
          />
          <div className='mt-1'>
            <p>{t('common.useful_links')}</p>
            <div className='flex'>
              <div className='h-10 w-10 mr-1 mt-1 flex justify-center items-center'>
                <img src='./assets/wiki_icon.svg' alt='wiki_icon' />
              </div>
              <BaseInput
                type='text'
                name='wikiLinkInput'
                value={addPlaceData.wiki_link}
                onBlur={() => {
                  dispatch(addPlaceActions.changeWikiLink(wikiLinkRef.current.value));
                }}
                ref={wikiLinkRef}
              />
            </div>
            <div className='flex'>
              <div className='h-10 w-10 mr-1 mt-1 flex justify-center items-center'>
                <img src='./assets/web_icon.svg' alt='web_icon' />
              </div>
              <BaseInput
                type='text'
                name='topicLinkInput'
                value={addPlaceData.topic_link}
                onBlur={() => {
                  dispatch(addPlaceActions.changeTopicLink(topicLinkRef.current.value));
                }}
                ref={topicLinkRef}
              />
            </div>
          </div>
        </div>
        <div className='p-2 flex gap-4 justify-center'>
          <BaseButton
            type='submit'
            name={t('common.confirm')}
            btnBg='blue'
            onClick={handleConfirm}
          ></BaseButton>
        </div>
      </BaseModal>
    </>
  );
}

export default FormModal;
