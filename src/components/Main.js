// Component to contain header and weather forecast
// This will be put inside wrapper

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
import AddReview from "./AddReview"

import * as restaurantsData from "./../data/restaurants.json";

import Context from "../Context";

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const [minRating, setMinRating] = useState(1);
  const [addRestFlag, setAddRestFlag] = useState()
  const [tempCoords, setTempCoords] = useState([])
  const [addReviewFlag, setAddReviewFlag] = useState()

  const resetMinRating = (newValue) => {
    console.log(`main: ${newValue}`);
    setMinRating(newValue);
  };

  const searchApi = async (lati, lonn) => {
    console.log("search api called", location);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lati},${lonn}&radius=1500&type=restaurant&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`

    const request = await axios.get(url).catch((error) => {
      console.log("erre", error)
    });
    const response = request;
    if (response && response.status !== 200) {
      setError("Error fetching weather information");
    }
    if (response) {
      // console.log("Reesponse recived", response)
      // console.log("Result Array", response.data.results)
      // console.log("resetRestBefo", restaurants)
      setRestaurants(...restaurants, response.data.results);
      // setRestaurants(response.data.results);
      // console.log("resetRest", restaurants)
      // restList = response.data.results
      // setRestList(response.data.results)
      // console.log("chack restlisty", restList)
      // setRestresult(restList)
      // setRestView(restList)
      // console.log("Result restresut", restList)
    }
    // try {
    //   const response = await yelp.get("/search", {
    //     params: {
    //       limit: 50,
    //       term: "restaurants",
    //       latitude: lati,
    //       longitude: lonn,
    //     },
    //   });
    //   let results = response.data;
    //   setRestaurants(...restaurants, response.data.businesses);
    // } catch (err) {
    //   console.log(err);
    //   setError(
    //     "Error fetching restaurants. Please check your internet connection."
    //   );
    //   return setRestaurants(null);
    // }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        // lat: -39.866667,
        // lon: 176.283333,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      console.log("recived location", location)
      searchApi(position.coords.latitude, position.coords.longitude)
    });
    // set initial restaurants from json

    console.log("use effect run", location, restaurantsData.default)
    setRestaurants([restaurantsData.default]);
    console.log("ani", restaurants)
    // fetch restaurants from yelp
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
          {addReviewFlag && <AddReview />}

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
