import { useRef, useEffect, useState } from 'react';
import BaseModal from 'Base/BaseModal';
import BaseInput from 'Base/BaseInput';
import BaseTextarea from 'Base/BaseTextarea';
import BaseButton from 'Base/BaseButton';
import BaseSelect from 'Base/BaseSelect';
import BaseImageUpload from 'Base/BaseImageUpload/BaseImageUpload';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailActions, selectAddTrail } from 'Redux/addTrailSlice';
import { modalsActions } from 'Redux/modalsSlice';
import { drawingToolsActions, selectDrawingTools } from 'Redux/drawingToolsSlice';
import { drawingEventsActions, selectDrawingEvents } from 'Redux/drawingEventsSlice';
import { selectFormValidation, formValidationActions } from 'Redux/formValidationSlice';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { selectUpdateTrail, updateTrailActions } from 'Redux/updateTrailSlice';
import { addTrail, deleteTrail } from 'Redux/allMapTrailsSlice';
import WebIcon from 'icons/WebIcon';
import WikiIcon from 'icons/WikiIcon';
import { registerAppChanges } from 'utils';
import { confirmationModalActions } from 'Redux/confirmationModalSlice';
import { notificationModalActions } from 'Redux/notificationModalSlice';
import AlertIcon from 'icons/AlertIcon';

const TrailFormModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addTrailData = useSelector(selectAddTrail);
  const updateTrailData = useSelector(selectUpdateTrail);
  const drawingTools = useSelector(selectDrawingTools);
  const drawingEvents = useSelector(selectDrawingEvents);
  const formValidation = useSelector(selectFormValidation);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();
  const periodRef = useRef();
  const wikiLinkRef = useRef();
  const topicLinkRef = useRef();
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [type, setType] = useState([]);
  const [period, setPeriod] = useState([]);
  const [inputLength, setInputLength] = useState(0);
  const [descLength, setDescLength] = useState(0);

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
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
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
      dispatch(notificationModalActions.changeType('alert'));
      dispatch(notificationModalActions.changeTitle(t('common.axios_warning')));
      dispatch(notificationModalActions.changeIsNotificationModalOpen());
    }
  };

  useEffect(() => {
    if (props.type === 'update' && updateTrailData.isDataLoaded === false) {
      dispatch(addTrailActions.changeName(updateTrailData.trail.path_name));
      dispatch(addTrailActions.changeDescription(updateTrailData.trail.description));
      dispatch(addTrailActions.changeType(updateTrailData.trail.type));
      dispatch(addTrailActions.changePeriod(updateTrailData.trail.period));
      dispatch(addTrailActions.changeWikiLink(updateTrailData.trail.wiki_link));
      dispatch(addTrailActions.changeTopicLink(updateTrailData.trail.topic_link));
      dispatch(addTrailActions.setTrailCoords(JSON.parse(updateTrailData.trail.coordinates)));
      validateName(updateTrailData.trail.path_name);
      validateDescription(updateTrailData.trail.description);
      dispatch(formValidationActions.changeIsValidType(updateTrailData.trail.type !== '0'));
      dispatch(formValidationActions.changeIsValidPeriod(updateTrailData.trail.period !== '0'));
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

  const handleSubmit = () => {
    if (validateForm()) {
      if (props.type === 'update') {
        axios
          .put(`http://localhost:8000/memo_places/path/${updateTrailData.trail.id}/`, {
            user: user.user_id,
            path_name: addTrailData.path_name,
            description: addTrailData.description,
            type: addTrailData.type,
            period: addTrailData.period,
            wiki_link: addTrailData.wiki_link,
            topic_link: addTrailData.topic_link,
            coordinates: JSON.stringify(addTrailData.coordinates),
          })
          .then((response) => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            registerAppChanges(
              'admin.changes_messages.trail_edit',
              user.user_id,
              updateTrailData.trail.id,
            );
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
          })
          .catch(() => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('error'));
          });
        return;
      } else {
        axios
          .post(`http://localhost:8000/memo_places/path/`, {
            user: user.user_id,
            path_name: addTrailData.path_name,
            description: addTrailData.description,
            type: addTrailData.type,
            period: addTrailData.period,
            wiki_link: addTrailData.wiki_link,
            topic_link: addTrailData.topic_link,
            coordinates: JSON.stringify(addTrailData.coordinates),
          })
          .then((response) => {
            dispatch(confirmationModalActions.changeIsConfirmationModalOpen());
            dispatch(confirmationModalActions.changeType('success'));
            registerAppChanges(
              'admin.changes_messages.trail_add',
              user.user_id,
              addTrailData.path_name,
            );
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

  useEffect(() => {
    fetchTypeItems();
    fetchPeriodItems();
  }, []);

  return (
    <BaseModal title={props.title} closeModal={props.closeModal}>
      <div className='px-2 py-4 max-h-[80vh] overflow-y-auto flex gap-4'>
        <div className='flex flex-col gap-2 w-2/5'>
          <div className='flex flex-col gap-2'>
            <BaseSelect
              label={t('common.type')}
              name={t('common.type')}
              value={addTrailData.type}
              options={type}
              ref={typeRef}
              onBlur={() => {
                dispatch(addTrailActions.changeType(typeRef.current.value));
                dispatch(formValidationActions.changeIsValidType(typeRef.current.value !== '0'));
              }}
              onChange={() => {
                dispatch(addTrailActions.changeType(typeRef.current.value));
                dispatch(formValidationActions.changeIsValidType(typeRef.current.value !== '0'));
              }}
              isValid={formValidation.isValidType}
            />
            {formValidation.isValidType === false && (
              <span className='text-red-500 flex items-center gap-2'>
                <AlertIcon className='h-6 w-6' color='#ef4444' />
                <span>{t('admin.common.field_required')}</span>
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <BaseSelect
              label={t('common.period')}
              name={t('common.period')}
              value={addTrailData.period}
              options={period}
              ref={periodRef}
              onBlur={() => {
                dispatch(addTrailActions.changePeriod(periodRef.current.value));
                dispatch(
                  formValidationActions.changeIsValidPeriod(periodRef.current.value !== '0'),
                );
              }}
              onChange={() => {
                dispatch(addTrailActions.changePeriod(periodRef.current.value));
                dispatch(
                  formValidationActions.changeIsValidPeriod(periodRef.current.value !== '0'),
                );
              }}
              isValid={formValidation.isValidPeriod}
            />
            {formValidation.isValidPeriod === false && (
              <span className='text-red-500 flex items-center gap-2'>
                <AlertIcon className='h-6 w-6' color='#ef4444' />
                <span>{t('admin.common.field_required')}</span>
              </span>
            )}
          </div>
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
          <div className='flex flex-col gap-2'>
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
                handleNameChange();
              }}
              ref={nameRef}
              isValid={formValidation.isValidName}
            />
            <div className='flex justify-between px-2'>
              {formValidation.isValidName === false ? (
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
          <BaseImageUpload fileSize={2} />
          <div className='flex flex-col gap-2'>
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
                handleDescChange();
              }}
              isValid={formValidation.isValidDescription}
            />
            <div className='flex justify-between px-2'>
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
        <BaseButton name={t('common.cancel')} btnBg='red' onClick={props.closeModal} />
        <BaseButton name={t('common.confirm')} btnBg='blue' onClick={handleSubmit} />
      </div>
    </BaseModal>
  );
};

export default TrailFormModal;
