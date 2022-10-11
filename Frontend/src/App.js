import * as React from 'react';
import {Label, Input, Button, Form, FormGroup, Col} from 'reactstrap';
import { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Map from 'react-map-gl';
import VOLCANOES from './volcanoes.json';
import { Marker , 
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl} from 'react-map-gl';
import'mapbox-gl/dist/mapbox-gl.css';
import { loadPeiData, LOAD_VOLCANOES } from './actions';

export default function App() {
  const dispatch = useDispatch();
  const volcanoes = useSelector((state) => state.response);
  useEffect(() => {dispatch(LOAD_VOLCANOES)}, []);
  const [peifrom , setpeifrom] = useState();
  const [peito, setpeito] = useState();
  const handlePeiFromChange = (e) => {
     setpeifrom(e.target.value);
  }
  const handlePeiToChange = (e) => {
    setpeito(e.target.value);
 }
 const handleSubmit = () => {
  if(peifrom && peito)
    dispatch(loadPeiData(peifrom,peito));
 }
  setTimeout(console.log(volcanoes), 10000);
  let [viewport, setViewPort] = useState({ longitude: VOLCANOES.features[0].properties.Longitude,
    latitude: VOLCANOES.features[0].properties.Latitude,
    zoom: 8,
   });
   const pins = React.useCallback(
    () => {
      volcanoes.map((volcano, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={volcano.properties.Longitude}
          latitude={volcano.properties.Latitude}
          anchor="bottom"
        >
        </Marker>
      ))},
    [volcanoes]
  );
  return (
    <>
    <h1 className="text-centre">Volcanoes Map</h1>
    <Form>
      <FormGroup row>
    <Label className='form-label' sm={2}>PEI   from</Label>
    <Col sm={10}>
    <Input className='form-input' type="text" onChange={handlePeiFromChange}/>
    </Col>
    <Label className='form-label' sm={2}>PEI   to</Label>
    <Col sm = {10}>
    <Input type="text" onChange={handlePeiToChange}/>
    </Col>
    <Button onClick={handleSubmit}>Filter</Button>
    </FormGroup>
    </Form>
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
    </Map>
    </>
  );
}
