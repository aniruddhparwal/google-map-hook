import React, { useContext } from "react";
import { GoogleMap, Marker } from "react-google-maps";
import Context from "../Context";

const Map = () => {
  const { location, restaurants, setAddRestFlag, minRating, setTempCoords } = useContext(Context);

  let data = []
  const onMapClick = React.useCallback((event) => {
    setAddRestFlag(true)
    data = {
      "geometry": {
        "location": {
          "lat": event.latLng.lat(),
          "lng": event.latLng.lng(),
        }
      }
    }
    setTempCoords(data)
  })
  const onMarkerClick = (evt) => {
    console.log("marker Clicked", evt, evt.latLng.lat, evt.latLng.lng);
  };

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{
        lat: location.lat, lng: location.lon
      }}
      onClick={onMapClick}
    >
      {
        restaurants.map((restu) => {
          if (restu.rating < minRating || !restu.rating) {
            return null;
          } else {
            return (
              <Marker
                key={restu.name}
                position={{
                  lat: restu.geometry.location.lat,
                  lng: restu.geometry.location.lng,
                }}
                onClick={onMarkerClick}
              />
            );
          }
        })
      }
    </GoogleMap >
  );
};

export default Map;
