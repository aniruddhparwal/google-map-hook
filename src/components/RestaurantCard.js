import React from "react";
import StarRatings from "react-star-ratings";

const RestaurantCard = ({ name, imageSource, rating }) => {
  return (
    <div className="card">
      <img
        src={imageSource}
        alt="restaurant "
        className="restaurant-image"
      // style={{ "height": "100px", "width": "100px" }}
      />
      <div className="container">
        <h4 className="restaurant-title">{name}</h4>
        <StarRatings
          rating={rating}
          starRatedColor="rgb(220,20,60)"
          starDimension="30px"
        />
        <h2>Review</h2>
      </div>
    </div>
  );
};

export default RestaurantCard;
