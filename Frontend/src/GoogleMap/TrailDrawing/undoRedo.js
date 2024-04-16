import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { drawingToolsActions, selectDrawingTools } from '../../Redux/drawingToolsSlice';
import { drawingEventsActions, selectDrawingEvents } from '../../Redux/drawingEventsSlice';

export function useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef) {
  const dispatch = useDispatch();
  const drawingEventsData = useSelector(selectDrawingEvents);
  const numberOfDrawnPolylines = useRef(drawingEventsData.numberOfDrawnPolylines);

  useEffect(() => {
    if (!drawingManager) return;

    const addUpdateListener = (eventName, drawResult) => {
      const updateListener = window.google.maps.event.addListener(
        drawResult.overlay,
        eventName,
        () => {
          if (eventName === 'dragstart') {
            overlaysShouldUpdateRef.current = false;
          }

          if (eventName === 'dragend') {
            overlaysShouldUpdateRef.current = true;
          }

          if (overlaysShouldUpdateRef.current) {
            dispatch(drawingToolsActions.updateOverlays());
          }
        },
      );

      dispatch(drawingEventsActions.pushEvent(updateListener));
    };

    const overlayCompleteListener = window.google.maps.event.addListener(
      drawingManager,
      'overlaycomplete',
      (drawResult) => {
        if (numberOfDrawnPolylines.current >= 1) {
          drawResult.overlay.setMap(null);
          return;
        }

        numberOfDrawnPolylines.current++;
        dispatch(drawingEventsActions.increaseNumberOfDrawnPolylines());

        [('bounds_changed', 'dragstart', 'dragend', 'mouseup')].forEach((eventName) =>
          addUpdateListener(eventName, drawResult),
        );

        dispatch(drawingToolsActions.setOverlay(drawResult));
      },
    );

    dispatch(drawingEventsActions.pushEvent(overlayCompleteListener));
  }, [drawingManager, overlaysShouldUpdateRef, dispatch, numberOfDrawnPolylines]);
}

export function useOverlaySnapshots(map, overlaysShouldUpdateRef) {
  const drawingTools = useSelector(selectDrawingTools);

  useEffect(() => {
    if (!map || !drawingTools.now) return;

    for (const overlay of drawingTools.now) {
      overlaysShouldUpdateRef.current = false;

      overlay.geometry.setMap(map);

      const { path } = overlay.snapshot;

      overlay.geometry.setPath(path ?? []);

      overlaysShouldUpdateRef.current = true;
    }
  }, [map, overlaysShouldUpdateRef, drawingTools.now]);
}
