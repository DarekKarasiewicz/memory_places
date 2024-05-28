import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAddTrail } from 'Redux/addTrailSlice';

export function useDrawingManager() {
  const map = useMap();
  const drawing = useMapsLibrary('drawing');
  const addTrailData = useSelector(selectAddTrail);

  const [drawingManager, setDrawingManager] = useState(null);

  useEffect(() => {
    if (!map || !drawing) return;

    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingControl: addTrailData.isSelecting ? true : false,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE],
      },
      polylineOptions: {
        editable: true,
        draggable: true,
      },
    });

    setDrawingManager(newDrawingManager);

    return () => {
      newDrawingManager.setMap(null);
    };
  }, [drawing, map, addTrailData.isSelecting]);

  return drawingManager;
}
