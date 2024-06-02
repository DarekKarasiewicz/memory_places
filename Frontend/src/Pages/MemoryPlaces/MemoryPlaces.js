import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions, selectModals } from 'Redux/modalsSlice';
import { selectAddPlaceLocation } from 'Redux/addPlaceLocationSlice';
import { addPlacelocationActions } from 'Redux/addPlaceLocationSlice';
import { selectUserPlaces, userPlacesActions } from 'Redux/userPlacesSlice';
import { addPlaceActions } from 'Redux/addPlaceSlice';
import { updatePlaceActions } from 'Redux/updatePlaceSlice';
import { formValidationActions } from 'Redux/formValidationSlice.jsx';
import { selectAddTrail, addTrailActions } from 'Redux/addTrailSlice.jsx';
import { drawingEventsActions, selectDrawingEvents } from 'Redux/drawingEventsSlice.jsx';
import { drawingToolsActions, selectDrawingTools } from 'Redux/drawingToolsSlice.jsx';
import { updateTrailActions } from 'Redux/updateTrailSlice.jsx';
import { selectApprovalModal } from 'Redux/approvalModalSlice.jsx';
import { selectAdvancedObject } from 'Redux/advancedObjectSlice.jsx';

import App from 'App';
import UserPlacesMenu from 'Pages/MemoryPlaces/User/UserPlacesMenu.jsx';
import GoogleMap from 'Pages/MemoryPlaces/GoogleMap/GoogleMap.js';
import Navbar from 'Components/Navbar/Navbar.js';
import FormModal from 'Components/Modals/FormModal.js';
import LanguageSwitcher from 'Components/LanguageSwitcher/LanguageSwitcher.js';
import Footer from './Footer/Footer.js';
import Infobar from 'Components/Navbar/Infobar.jsx';
import TrailFormModal from 'Components/Modals/TrailFormModal.jsx';
import TrailGuideModal from 'Components/Modals/TrailGuideModal.js';
import ApprovalModal from 'Components/Modals/ApprovalModal.js';
import AdvancedInfoBox from './GoogleMap/AdvancedInfoBox/AdvancedInfoBox.js';

function MemoryPlaces() {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModals);
  const addPlaceData = useSelector(selectAddPlaceLocation);
  const userPlacesData = useSelector(selectUserPlaces);
  const addTrailData = useSelector(selectAddTrail);
  const advancedObject = useSelector(selectAdvancedObject);
  const { t } = useTranslation();
  const drawingTools = useSelector(selectDrawingTools);
  const drawingEvents = useSelector(selectDrawingEvents);
  const approvalModalData = useSelector(selectApprovalModal);

  const handleFormModalVisability = () => {
    if (modalData.isFormModalOpen === true) {
      dispatch(addPlaceActions.reset());
      dispatch(addPlacelocationActions.clearLocation());
      dispatch(formValidationActions.reset());
    }
    dispatch(modalsActions.changeIsFormModalOpen());
  };

  const handleEditFormModalVisability = () => {
    if (modalData.isUpdateModalOpen === true) {
      dispatch(addPlaceActions.reset());
      dispatch(updatePlaceActions.reset());
      dispatch(addPlacelocationActions.clearLocation());
      dispatch(formValidationActions.reset());
      dispatch(userPlacesActions.changeIsOpen());
    }
    dispatch(modalsActions.changeIsUpdateModalOpen());
  };

  const handleTrailFormModalVisability = () => {
    if (modalData.isTrailFormOpen === true) {
      drawingTools.now[0] && drawingTools.now[0].geometry.setMap(null);
      drawingEvents.events.forEach((listener) => window.google.maps.event.removeListener(listener));
      dispatch(drawingEventsActions.reset());
      dispatch(drawingToolsActions.reset());
      dispatch(addTrailActions.reset());
      dispatch(formValidationActions.reset());
    }
    dispatch(modalsActions.changeIsTrailFormOpen());
  };
  const handleTrailUpdateFormModalVisability = () => {
    if (drawingTools.now.length != 0) {
      drawingTools.now[0].geometry.setMap(null);
    }
    drawingEvents.events.forEach((listener) => window.google.maps.event.removeListener(listener));
    dispatch(drawingEventsActions.reset());
    dispatch(drawingToolsActions.reset());
    dispatch(addTrailActions.reset());
    dispatch(updateTrailActions.reset());
    dispatch(formValidationActions.reset());
    dispatch(userPlacesActions.changeIsOpen());
    dispatch(modalsActions.changeIsTrailUpdateFormOpen());
  };

  return (
    <App>
      <GoogleMap />
      {userPlacesData.isOpen && <UserPlacesMenu />}
      {!addPlaceData.isSelecting && !addTrailData.isSelecting ? <Navbar /> : null}
      {addPlaceData.isSelecting && <Infobar />}
      {modalData.isFormModalOpen && (
        <FormModal
          title={t('common.add_place')}
          type='create'
          closeModal={handleFormModalVisability}
        />
      )}
      {modalData.isUpdateModalOpen && (
        <FormModal
          title={t('common.edit_place')}
          type='update'
          closeModal={handleEditFormModalVisability}
        />
      )}
      {modalData.isTrailFormOpen && (
        <TrailFormModal
          title={t('common.add_trail')}
          type='create'
          closeModal={handleTrailFormModalVisability}
        />
      )}
      {modalData.isTrailUpdateFormOpen && (
        <TrailFormModal
          title={t('common.edit_trail')}
          type='update'
          closeModal={handleTrailUpdateFormModalVisability}
        />
      )}

      {advancedObject.isAdvancedObjectOpen && <AdvancedInfoBox />}

      {approvalModalData.isApprovalModalOpen && <ApprovalModal />}

      {modalData.isTrailGuideModalOpen && addTrailData.isSelecting ? <TrailGuideModal /> : null}

      {!addPlaceData.isSelecting && !addTrailData.isSelecting ? <Footer /> : null}

      {!addPlaceData.isSelecting && !addTrailData.isSelecting ? <LanguageSwitcher /> : null}
    </App>
  );
}

export default MemoryPlaces;
