import * as React from 'react';
import { useState, useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Map from 'react-map-gl';
import VOLCANOES from './volcanoes.json';
import { Marker , 
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl} from 'react-map-gl';
import'mapbox-gl/dist/mapbox-gl.css';
import { LOAD_VOLCANOES } from './actions';

export default function App() {
  const volcanoes = useSelector((state) => state.response);
  const dispatch = useDispatch();
  useEffect(() => dispatch(LOAD_VOLCANOES), []);
  setTimeout(console.log(volcanoes), 10000);
  let [viewport, setViewPort] = useState({ longitude: VOLCANOES.features[0].properties.Longitude,
    latitude: VOLCANOES.features[0].properties.Latitude,
    zoom: 8,
   });
   const pins = useMemo(
    () =>
      volcanoes.map((volcano, index) => (
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
    <>
    {volcanoes && 
    <Map
    {...viewport}
      onMove = {(newview) => setViewPort(newview)}
      mapboxAccessToken = 'pk.eyJ1Ijoicm8tMHQiLCJhIjoiY2w4bmN0bnp3MDRlbzQxbzQwYnM3bWJ3cCJ9.KmMoMoWQSHnCdTIJORS55A'
      style={{width: window.innerWidth, height: window.innerHeight}}
      mapStyle="mapbox://styles/mapbox/dark-v9"
    >
      <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
      {pins}
    </Map>}
    </>
  );
}
