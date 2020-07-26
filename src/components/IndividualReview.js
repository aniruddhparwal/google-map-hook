import React, { useEffect, useState, useContext } from "react"
import Context from "../Context";
import Rating from '@material-ui/lab/Rating';


const IndividualReview = ({ name, icon, rating, position }) => {
    const { lati, lon, restresult, restView } = useContext(Context);
    // console.log("ddd", restView)
    return (
        <div className="IndividualReview">
            <div className="row">
                <div className="col col-2">
                    <div className="placePhoto">
                        {/* <img src="https://via.placeholder.com/100" alt="Rest Pic" /> */}
                        <img className="restImg" src={icon} alt="Rest Pic" />
                    </div>
                </div>
                <div className="col col-10 details">
                    <div className="row placeTitle">{name}</div>
                    <div className="row placeRating">
                        <Rating name="half-rating" defaultValue={rating} precision={0.5} />{rating}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualReview