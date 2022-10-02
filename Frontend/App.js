import * as React from 'react';
import { useState, useMemo} from 'react';
import Map from 'react-map-gl';
import VOLCANOES from './volcanoes.json';
import { Marker } from 'react-map-gl';

export default function App() {
  let [viewport, setViewPort] = useState({ longitude: VOLCANOES.features[0].properties.Longitude,
    latitude: VOLCANOES.features[0].properties.Latitude,
    zoom: 8,
   });
   const pins = useMemo(
    () =>
      VOLCANOES.features.map((volcano, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={volcano.properties.Longitude}
          latitude={volcano.properties.Latitude}
          anchor="bottom"
        >
        </Marker>
      )),
    []
  );
  return (
    <Map
      onMove = {(newview) => setViewPort(newview)}
      mapboxAccessToken = 'pk.eyJ1Ijoicm8tMHQiLCJhIjoiY2w4bmN0bnp3MDRlbzQxbzQwYnM3bWJ3cCJ9.KmMoMoWQSHnCdTIJORS55A'
      style={{width: window.innerWidth, height: window.innerHeight}}
      mapStyle="mapbox://styles/mapbox/dark-v9"
    >
      {pins}
    </Map>
  );
}