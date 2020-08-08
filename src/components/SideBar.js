import React, { useContext } from "react";
import Context from "../Context";
import RestaurantCard from "./RestaurantCard";

const SideBar = () => {
  const { restaurants, minRating } = useContext(Context);
  return (
    <div className="sidebar">
      {restaurants.map((restu) => {
        if (restu.rating < minRating || !restu.rating) {
          return null;
        } else {
          return (
            <RestaurantCard
              key={restu.name}
              name={restu.name}
              imageSource={restu.icon}
              rating={restu.rating}
            />
          );
        }
      })}
    </div>
  );
};

export default SideBar;
