import React, { useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';
import { drawingToolsActions, selectDrawingTools } from '../../Redux/drawingToolsSlice.jsx';
import { addTrailActions } from '../../Redux/addTrailSlice.jsx';
import { useDrawingManagerEvents, useOverlaySnapshots } from './undoRedo.js';
import { modalsActions } from '../../Redux/modalsSlice.jsx';

const DrawingControl = ({ drawingManager }) => {
  const map = useMap();
  const drawingTools = useSelector(selectDrawingTools);
  const dispatch = useDispatch();

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

    dispatch(addTrailActions.changeIsSelecting(false));
    dispatch(modalsActions.changeIsTrailFormOpen());
  };

  return (
    <div className='drawing-history'>
      <button
        onClick={() => dispatch(drawingToolsActions.undo())}
        disabled={!drawingTools.past.length}
      >
        <img src='../../../assets/undo_icon.svg' />
      </button>
      <button
        onClick={() => dispatch(drawingToolsActions.redo())}
        disabled={!drawingTools.future.length}
      >
        <img src='../../../assets/redo_icon.svg' />
      </button>
      <button onClick={handleDrawingAccept}>
        <img src='../../../assets/accept_icon.svg' />
      </button>
    </div>
  );
};

export default DrawingControl;
