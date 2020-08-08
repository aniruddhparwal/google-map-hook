import React, { useContext, useState } from "react";
import { GoogleMap, Marker, InfoBox } from "react-google-maps";
import Context from "../Context";
import AddRest from "./AddRest"

const Map = () => {
  const { location, restaurants, setAddRestFlag, minRating, setRestaurants, setTempCoords, tempCoords } = useContext(Context);
  const [selected, setSelected] = useState(true);

  let tempRes = []
  let data = []
  console.log("map", location)
  console.log("resmap", restaurants)
  const onMapClick = React.useCallback((event) => {
    setAddRestFlag(true)
    console.log("event", event.latLng.lat())
    console.log("event cl", typeof (restaurants))
    data = {
      "geometry": {
        "location": {
          "lat": event.latLng.lat(),
          "lng": event.latLng.lng(),
        }
      }
    }
    setTempCoords(data)
    // tempRes =
    console.log("tepP", tempRes)
    console.log("data", typeof (tempRes))
    // setRestaurants([...restaurants, data])
    // setRestaurants();

    console.log("update  click  res", restaurants)

    // })
    // AddRest(event)
    // setMarkers(current => [...current, {
    //   lat: event.latLng.lat(),
    //   lng: event.latLng.lng(),
    //   time: new Date(),
    //   name: " ",
    // }])
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
            // console.log(restu)
            return (
              <Marker
                key={restu.name}
                position={{
                  // lat: restu.coordinates.latitude,
                  // lng: restu.coordinates.longitude,
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
