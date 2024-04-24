import { useRef, useEffect, useState } from 'react';
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
import WebIcon from '../icons/WebIcon';
import WikiIcon from '../icons/WikiIcon';

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
  const [type, setType] = useState([]);
  const [period, setPeriod] = useState([]);

  const fetchTypeItems = async () => {
    try {
      const responseType = await axios.get(`http://127.0.0.1:8000/admin_dashboard/types`);
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
      console.log(error);
    }
  };

  const fetchPeriodItems = async () => {
    try {
      const responsePeriod = await axios.get(`http://127.0.0.1:8000/admin_dashboard/periods`);
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
      console.log(error);
    }
  };

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
      dispatch(formValidationActions.changeIsValidType(updateTrailData.trail.type !== 0));
      dispatch(formValidationActions.changeIsValidPeriod(updateTrailData.trail.period !== 0));
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

  useEffect(() => {
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <BaseModal title={props.title} closeModal={props.closeModal}>
      <div className='px-2 py-4 max-h-[80vh] overflow-y-auto flex gap-4'>
        <div className='flex flex-col gap-2 w-2/5'>
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
          <BaseSelect
            label={t('common.type')}
            name={t('common.type')}
            value={addTrailData.type}
            options={type}
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
            options={period}
            ref={periodRef}
            onBlur={() => {
              dispatch(addTrailActions.changePeriod(periodRef.current.value));
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
          <div className='mt-1 flex flex-col gap-1'>
            <p>{t('common.useful_links')}</p>
            <div className='flex justify-center items-center gap-2'>
              <WikiIcon />
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
            <div className='flex justify-center items-center gap-2'>
              <WebIcon />
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
        <div className='flex flex-col gap-2 w-3/5'>
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
          <BaseImageUpload fileSize={2} />
          <BaseTextarea
            rows='12'
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
        </div>
      </div>
      <div className='p-2 flex gap-4 justify-center'>
        <BaseButton name={t('common.cancel')} btnBg='red' onClick={props.closeModal} />
        <BaseButton name={t('common.confirm')} btnBg='blue' onClick={handleSubmit} />
      </div>
    </BaseModal>
  );
};

export default TrailFormModal;
