import React, { useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';
import { drawingToolsActions, selectDrawingTools } from '../../Redux/drawingToolsSlice.jsx';
import { addTrailActions } from '../../Redux/addTrailSlice.jsx';
import { useDrawingManagerEvents, useOverlaySnapshots } from './undoRedo.js';
import { modalsActions } from '../../Redux/modalsSlice.jsx';
import { selectUpdateTrail } from '../../Redux/updateTrailSlice.jsx';

const DrawingControl = ({ drawingManager }) => {
  const map = useMap();
  const drawingTools = useSelector(selectDrawingTools);
  const dispatch = useDispatch();
  const updateTrailData = useSelector(selectUpdateTrail);
  const overlaysShouldUpdateRef = useRef(false);

  useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef);
  useOverlaySnapshots(map, overlaysShouldUpdateRef);

  const handleDrawingAccept = () => {
    if (drawingTools.now.length) {
      const coords = drawingTools.now[0].geometry
        .getPath()
        .getArray()
        .map((latLng) => {
          return {
            lat: latLng.lat(),
            lng: latLng.lng(),
          };
        });
      dispatch(addTrailActions.setTrailCoords(coords));
    }
    if (updateTrailData.isDataLoaded === true) {
      dispatch(modalsActions.changeIsTrailUpdateFormOpen());
      return;
    }
    dispatch(addTrailActions.changeIsSelecting(false));
    dispatch(modalsActions.changeIsTrailFormOpen());
  };

  const closeDrawingManager = () => {
    dispatch(addTrailActions.changeIsSelecting(false));
    dispatch(modalsActions.changeIsTrailFormOpen());
  };

  return (
    <div className='flex gap-0 mt-1 border border-transparent'>
      <button
        onClick={() => dispatch(drawingToolsActions.undo())}
        disabled={!drawingTools.past.length}
        className='bg-white h-10 w-10 relative text-left font-roboto font-normal text-xs hover:bg-gray-200 shadow cursor-pointer flex justify-center items-center rounded-l-sm'
      >
        <img src='../../../assets/undo_icon.svg' className='h-5 w-5' />
      </button>
      <button
        onClick={() => dispatch(drawingToolsActions.redo())}
        disabled={!drawingTools.future.length}
        className='bg-white h-10 w-10 relative text-left font-roboto font-normal text-xs hover:bg-gray-200 shadow cursor-pointer flex justify-center items-center'
      >
        <img src='../../../assets/redo_icon.svg' className='h-5 w-5' />
      </button>
      <button
        onClick={handleDrawingAccept}
        className='bg-white h-10 w-10 relative text-left font-roboto font-normal text-xs hover:bg-gray-200 shadow cursor-pointer flex justify-center items-center rounded-r-sm'
      >
        <img src='../../../assets/accept_icon.svg' className='h-5 w-5' />
      </button>
      <button
        onClick={closeDrawingManager}
        className='bg-white h-10 w-10 relative text-left font-roboto font-normal text-xs hover:bg-gray-200 shadow cursor-pointer flex justify-center items-center rounded-r-sm'
      >
        <img src='../../../assets/cancel_icon.svg' className='h-5 w-5' />
      </button>
    </div>
  );
};

export default DrawingControl;
