import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import Rating from '@material-ui/lab/Rating';
import '../styles/style.css'


const AddRest = () => {
    const { restaurants, addRestFlag, setAddRestFlag, setRestaurants, setTempCoords, tempCoords } = useContext(Context);
    const [restName, setRestName] = useState('')
    const [restRating, setRestRating] = useState('')
    let restDetails = []
    useEffect(() => {
        console.log("AddRest")
        setAddRestFlag(true)
    }, [])
    const handleSubmit = (e, restName, setRestName, restRating, setRestRating) => {
        e.preventDefault()
        console.log("adred coo", tempCoords)
        restDetails = {
            name: restName,
            geometry: {
                location: {
                    lat: tempCoords.geometry.location.lat,
                    lng: tempCoords.geometry.location.lng,
                },
            },
            rating: restRating,
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png"

        }
        setRestaurants([...restaurants, restDetails])

        console.log("resDetsils", restDetails)
        console.log("formsubmit")
        setAddRestFlag(false)
    }

    console.log("AddRest")
    return (

        <div className="addrest">
            <h1>Add Restaurant </h1>
            <form onSubmit={(e) => handleSubmit(e, restName, setRestName, restRating, setRestRating)}>
                <input type="text" value={restName} onChange={(e) => setRestName(e.target.value)} />
                <Rating
                    name="simple-controlled"
                    value={restRating}
                    onChange={(event, newValue) => {
                        if (newValue != null) {
                            console.log("New Value", newValue)
                            setRestRating(newValue);
                        }
                    }}
                />
                <button>submit</button>
            </form>
        </div>
    )
}

export default AddRest