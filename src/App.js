import React from 'react';
import './App.css';
import ReviewArena from "./components/ReviewArena";
import Context from "./Context"

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "./mapStyles";

const libraries = ["places"]

const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}
const center = {
  lat: 43.653225,
  lng: -79.383186
}
const option = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0",
    libraries
  });

  const [markers, setMarkers] = React.useState([])
  const [selected, setSelected] = React.useState(null);
  const [lati, setLati] = React.useState();
  const [lon, setLon] = React.useState();

  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }])
  }, [])

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <div>
      <Context.Provider
        value={{
          lati: lati,
          lon: lon,
        }}
      >
        <h1>
          Restaurant{" "}
          <button onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,

                });
                setLati(position.coords.latitude)
                setLon(position.coords.longitude)
              },
              () => null
            );
          }}
          >
            <span role="img" aria-label="Food">
              🍔
        </span>
          </button>
        </h1>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={option}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map(marker => (
            <Marker key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              // icon={{
              //   // url: '/bear.svg',
              //   // origin: new window.google.maps.Point(0, 0),
              //   // anchor: new window.google.maps.Point(15, 15),
              //   // scaledSize: new window.google.maps.Size(30, 30),
              // }}
              onClick={() => {
                setSelected(marker)
              }}
            />
          ))}
          {selected ? (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {
              setSelected(null)
            }}>
              <div>
                <h2>Restraunt Spoted</h2>
              </div>
            </InfoWindow>
          ) : null}
          {lati && lon && <ReviewArena />}
        </GoogleMap>
      </Context.Provider>
    </div>)
};