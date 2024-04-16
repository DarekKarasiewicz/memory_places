import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

import { GoogleMapsContext, useMapsLibrary } from '@vis.gl/react-google-maps';

function usePolyline(props) {
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    path,
    strokeColor,
    strokeOpacity,
    strokeWeight,
    ...polylineOptions
  } = props;
  const callbacks = useRef({});
  Object.assign(callbacks.current, {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
  });

  const geometryLibrary = useMapsLibrary('geometry');

  const polyline = useRef(new window.google.maps.Polyline()).current;

  useMemo(() => {
    polyline.setOptions(polylineOptions);
  }, [polyline, polylineOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  useMemo(() => {
    if (!path || !geometryLibrary) return;
    polyline.setPath(path);
  }, [polyline, path, geometryLibrary]);

  useEffect(() => {
    if (!map) {
      if (map === undefined) console.error('<Polyline> has to be inside a Map component.');

      return;
    }

    polyline.setMap(map);

    return () => {
      polyline.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (!polyline) return;

    const gme = window.google.maps.event;
    [
      ['click', 'onClick'],
      ['drag', 'onDrag'],
      ['dragstart', 'onDragStart'],
      ['dragend', 'onDragEnd'],
      ['mouseover', 'onMouseOver'],
      ['mouseout', 'onMouseOut'],
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polyline, eventName, (e) => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => {
      gme.clearInstanceListeners(polyline);
    };
  }, [polyline]);

  useEffect(() => {
    if (!polyline) return;

    polyline.setOptions({
      strokeColor,
      strokeOpacity,
      strokeWeight,
    });
  }, [polyline, strokeColor, strokeOpacity, strokeWeight]);

  return polyline;
}

export const Polyline = forwardRef(function PolylineComponent(props, ref) {
  const polyline = usePolyline(props);

  useImperativeHandle(ref, () => polyline, []);

  return null;
});

Polyline.displayName = 'Polyline';
