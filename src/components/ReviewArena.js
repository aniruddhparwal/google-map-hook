import React, { useEffect, useState, useContext } from "react"
import IndividualReview from "./IndividualReview"
import Context from "../Context"
import axios from "axios";
import Rating from '@material-ui/lab/Rating';
import { Marker } from "@react-google-maps/api";

const ReviewArena = () => {

    const { lati, lon, markers, setMarkers } = useContext(Context);
    const [restresult, setRestresult] = useState();
    const [value, setValue] = useState(2);

    const [restView, setRestView] = useState();
    let restList = []

    useEffect(async () => {
        console.log("apicalllati", lati)
        console.log("apicalllon", lon)
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lati},${lon}&radius=1500&type=restaurant&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`
        const request = await axios.get(url).catch((error) => {
            console.log("erre", error)
        });
        const response = request;
        if (response && response.status !== 200) {
            // setError("Error fetching weather information");
        }
        if (response) {
            console.log("Reesponse recived", response)
            console.log("Result Array", response.data.results)
            restList = response.data.results
            console.log("chack restlisty", restList)
            setRestresult(restList)
            setRestView(restList)
            console.log("Result restresut", restList)
            // listUpdate('5')
        }
    }, []);
    const listUpdate = (newValue) => {
        console.log("listUpdate")
        console.log("Rest List with Value", restView, newValue)
        setRestView(restresult.filter(details => newValue >= details.rating))
        // console.log("restView", restresult)
        // console.log("marker checck", markers)
        setMarkers([])
        restView.map(item => {
            console.log("rating", item.rating)
            if (newValue >= item.rating) {
                console.log("accepted", markers)
                setMarkers(current => [...current, {
                    lat: item.geometry.location.lat,
                    lng: item.geometry.location.lng,
                    time: new Date(),
                    name: item.name,
                    rating: item.rating
                }])
            }
        })
        console.log("active markers", markers)
    }
    return (
        <div className="reviewArena">
            <Context.Provider
                value={{
                    restresult: restresult,
                    restView: restView
                }}
            >
                <div className="row arenaTitle">
                    <h1>ReviewArena</h1>
                </div>
                <div>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            if (newValue != null) {
                                console.log("New Value", newValue)
                                setValue(newValue);
                                listUpdate(newValue);
                            }
                        }}
                    />
                    {value}
                </div>
                <div className="row arenaReview" style={{ display: "grid" }}>
                    {restView && restView.map(details => (details.rating && <IndividualReview icon={details.icon} name={details.name} rating={details.rating} position={details.geometry.location} />))}
                </div>

            </Context.Provider>
        </div>
        // <h1>ss</h1>
    )
}

export default ReviewArena