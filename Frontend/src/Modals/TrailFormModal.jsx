import { useRef, useEffect } from 'react';
import BaseModal from '../Base/BaseModal';
import BaseInput from '../Base/BaseInput';
import BaseTextarea from '../Base/BaseTextarea';
import BaseButton from '../Base/BaseButton';
import BaseSelect from '../Base/BaseSelect';
import BaseImageUpload from '../Base/BaseImageUpload/BaseImageUpload';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailActions, selectAddTrail } from '../Redux/addTrailSlice';
import { modalsActions } from '../Redux/modalsSlice';
import { drawingToolsActions, selectDrawingTools } from '../Redux/drawingToolsSlice';
import { drawingEventsActions, selectDrawingEvents } from '../Redux/drawingEventsSlice';
import { selectFormValidation, formValidationActions } from '../Redux/formValidationSlice';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { selectUpdateTrail, updateTrailActions } from '../Redux/updateTrailSlice';
import { addTrail, deleteTrail } from '../Redux/allMapTrailsSlice';

const TrailFormModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addTrailData = useSelector(selectAddTrail);
  const updateTrailData = useSelector(selectUpdateTrail);
  const drawingTools = useSelector(selectDrawingTools);
  const drawingEvents = useSelector(selectDrawingEvents);
  const formValidation = useSelector(selectFormValidation);
  const nameRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();
  const periodRef = useRef();
  const wikiLinkRef = useRef();
  const topicLinkRef = useRef();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const type_options = [
    { label: t('modal.all'), value: 'all' },
    { label: t('modal.battlefield'), value: 'battlefield' },
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
    if (props.type === 'update' && updateTrailData.isDataLoaded === false) {
      dispatch(addTrailActions.changeName(updateTrailData.trail.path_name));
      dispatch(addTrailActions.changeDescription(updateTrailData.trail.description));
      dispatch(addTrailActions.changeFoundDate(updateTrailData.trail.found_date));
      dispatch(addTrailActions.changeType(updateTrailData.trail.type));
      dispatch(addTrailActions.changePeriod(updateTrailData.trail.period));
      dispatch(addTrailActions.changeWikiLink(updateTrailData.trail.wiki_link));
      dispatch(addTrailActions.changeTopicLink(updateTrailData.trail.topic_link));
      dispatch(addTrailActions.setTrailCoords(JSON.parse(updateTrailData.trail.coordinates)));
      validateName(updateTrailData.trail.path_name);
      validateDescription(updateTrailData.trail.description);
      dispatch(formValidationActions.changeIsValidDate(isNaN(updateTrailData.trail.found_date)));
      dispatch(formValidationActions.changeIsValidType(updateTrailData.trail.type !== 'all'));
      dispatch(formValidationActions.changeIsValidPeriod(updateTrailData.trail.period !== 'all'));
      dispatch(updateTrailActions.dataIsLoaded());
    }
  }, []);

  const handleSelectTrail = () => {
    if (props.type === 'update' && confirm(t('common.trail_change_warning'))) {
      dispatch(modalsActions.changeIsTrailUpdateFormOpen());
      dispatch(addTrailActions.changeIsSelecting(true));
      return;
    }
    dispatch(modalsActions.changeIsTrailFormOpen());
    dispatch(addTrailActions.changeIsSelecting(true));
  };

  const validateName = (name) => {
    const nameRegex = /[\w'():-]+/;
    dispatch(formValidationActions.changeIsValidName(nameRegex.test(name)));
  };

  const validateDescription = (desc) => {
    if (desc.length > 0) {
      dispatch(formValidationActions.changeIsValidDescription(true));
      return;
    }
    dispatch(formValidationActions.changeIsValidDescription(false));
  };

  const validateForm = () => {
    const isFormValid = Object.values(formValidation).every(
      (value) => value === true || value === null,
    );
    const isTrailCoordsValid = addTrailData.coordinates.length > 0;
    return isFormValid && isTrailCoordsValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (props.type === 'update') {
        axios
          .put(`http://localhost:8000/memo_places/path/${updateTrailData.trail.id}/`, {
            user: user.user_id,
            path_name: addTrailData.path_name,
            description: addTrailData.description,
            found_date: addTrailData.found_date,
            type: 1,
            period: 1,
            wiki_link: addTrailData.wiki_link,
            topic_link: addTrailData.topic_link,
            coordinates: JSON.stringify(addTrailData.coordinates),
          })
          .then((response) => {
            dispatch(deleteTrail(response.data.id));
            dispatch(addTrail(response.data));
            drawingTools.now[0].geometry.setMap(null);
            drawingEvents.events.forEach((listener) =>
              window.google.maps.event.removeListener(listener),
            );
            dispatch(drawingEventsActions.reset());
            dispatch(drawingToolsActions.reset());
            dispatch(addTrailActions.reset());
            dispatch(modalsActions.changeIsTrailUpdateFormOpen());
            dispatch(formValidationActions.reset());
          });
        return;
      }
      axios
        .post(`http://localhost:8000/memo_places/path/`, {
          user: user.user_id,
          path_name: addTrailData.path_name,
          description: addTrailData.description,
          found_date: addTrailData.found_date,
          type: 1,
          period: 1,
          wiki_link: addTrailData.wiki_link,
          topic_link: addTrailData.topic_link,
          coordinates: JSON.stringify(addTrailData.coordinates),
        })
        .then((response) => {
          dispatch(addTrail(response.data));
          drawingTools.now[0].geometry.setMap(null);
          drawingEvents.events.forEach((listener) =>
            window.google.maps.event.removeListener(listener),
          );
          dispatch(drawingEventsActions.reset());
          dispatch(drawingToolsActions.reset());
          dispatch(addTrailActions.reset());
          dispatch(modalsActions.changeIsTrailFormOpen());
          dispatch(formValidationActions.reset());
        });
      return;
    }
    alert(t('modal.filled_box_error'));
  };

  return (
    <BaseModal title={props.title} closeModal={props.closeModal}>
      <div className='p-2 max-h-[75vh] overflow-y-auto'>
        <BaseInput
          type='text'
          name='nameInput'
          label={t('common.name')}
          value={addTrailData.path_name}
          onBlur={() => {
            dispatch(addTrailActions.changeName(nameRef.current.value));
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
          value={addTrailData.found_date}
          onBlur={() => {
            dispatch(addTrailActions.changeFoundDate(dateRef.current.value));
            dispatch(formValidationActions.changeIsValidDate(isNaN(dateRef.current.value)));
          }}
          onChange={() => {
            dispatch(formValidationActions.changeIsValidDate(isNaN(dateRef.current.value)));
          }}
          isValid={formValidation.isValidDate}
        />
        <BaseImageUpload fileSize={2} />
        <div className='p-2 flex justify-center mt-2'>
          <BaseButton
            name={
              addTrailData.coordinates.length > 0
                ? t('common.edit_trail')
                : t('common.select_trail')
            }
            btnBg='blue'
            onClick={handleSelectTrail}
          />
        </div>
        <BaseSelect
          label={t('common.type')}
          name={t('common.type')}
          value={addTrailData.type}
          options={type_options}
          ref={typeRef}
          onBlur={() => {
            dispatch(addTrailActions.changeType(typeRef.current.value));
            dispatch(formValidationActions.changeIsValidType(typeRef.current.value !== 'all'));
          }}
          onChange={() => {
            dispatch(formValidationActions.changeIsValidType(typeRef.current.value !== 'all'));
          }}
          isValid={formValidation.isValidType}
        />
        <BaseSelect
          label={t('common.period')}
          name={t('common.period')}
          value={addTrailData.period}
          options={period_options}
          ref={periodRef}
          onBlur={() => {
            dispatch(addTrailActions.changePeriod(periodRef.current.value));
            dispatch(formValidationActions.changeIsValidPeriod(periodRef.current.value !== 'all'));
          }}
          onChange={() => {
            dispatch(formValidationActions.changeIsValidPeriod(periodRef.current.value !== 'all'));
          }}
          isValid={formValidation.isValidPeriod}
        />
        <BaseTextarea
          rows='6'
          label={t('common.description')}
          secondLabel={t('common.description-max')}
          maxLength={1000}
          ref={descriptionRef}
          value={addTrailData.description}
          onBlur={() => {
            dispatch(addTrailActions.changeDescription(descriptionRef.current.value));
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
              value={addTrailData.wiki_link}
              onBlur={() => {
                dispatch(addTrailActions.changeWikiLink(wikiLinkRef.current.value));
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
              value={addTrailData.topic_link}
              onBlur={() => {
                dispatch(addTrailActions.changeTopicLink(topicLinkRef.current.value));
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
          onClick={handleSubmit}
        ></BaseButton>
      </div>
    </BaseModal>
  );
};

export default TrailFormModal;
