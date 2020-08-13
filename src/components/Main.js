import React, { useEffect, useState } from "react";
import Header from "./Header";
import Content from "./Content";
import DateTime from "./DateTime";
import FilterRating from "./FilterRating";
import Error from "./Error";
import axios from "axios";
import AddRest from "./AddRest"
import MapContent from "./MapContent";
import SideBar from "./SideBar";
import * as restaurantsData from "./../data/restaurants.json";
import Context from "../Context";

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const [minRating, setMinRating] = useState(1);
  const [addRestFlag, setAddRestFlag] = useState()
  const [tempCoords, setTempCoords] = useState([])
  const [addReviewFlag, setAddReviewFlag] = useState(false)

  const resetMinRating = (newValue) => {
    // console.log(`main: ${newValue}`);
    setMinRating(newValue);
  };

  const searchApi = async (lati, lonn) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lati},${lonn}&radius=1500&type=restaurant&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`

    const request = await axios.get(url).catch((error) => {
      console.log("erre", error)
    });
    const response = request;
    if (response && response.status !== 200) {
      setError("Error fetching weather information");
    }
    if (response) {
      setRestaurants(...restaurants, response.data.results);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        // lat: -39.866667,
        // lon: 176.283333,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      searchApi(position.coords.latitude, position.coords.longitude)
    });
    // set initial restaurants from json

    // console.log("use effect run", location, restaurantsData.default)
    setRestaurants([restaurantsData.default]);
    // console.log("ani", restaurants)
    if (location) { searchApi(); }
  }, []);

  return (
    <div className="main">
      <Header />
      <Content>
        <DateTime />
        <Context.Provider
          value={{
            error: error,
            location: location,
            restaurants: restaurants,
            resetMinRating: resetMinRating,
            minRating: minRating,
            setRestaurants: setRestaurants,
            addRestFlag: addRestFlag,
            setAddRestFlag: setAddRestFlag,
            addReviewFlag: addReviewFlag,
            setAddReviewFlag: setAddReviewFlag,
            tempCoords: tempCoords,
            setTempCoords: setTempCoords
          }}
        >
          {addRestFlag && <AddRest />}
          {location && <FilterRating />}
          {error && <Error />}
          {location && <MapContent />}
          {location && <SideBar />}
        </Context.Provider>
      </Content>
    </div>
  );
};

export default Main;
