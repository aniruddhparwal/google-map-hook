import React, { useEffect } from "react";
import StarRatings from "react-star-ratings";
import Popup from "reactjs-popup";
import axios from "axios";
import IndividualReview from "./IndividualReview"


const RestaurantCard = ({ name, imageSource, rating, placeid }) => {
  let reviewResponse = ""
  const reviewFetch = async () => {
    console.log("fetch review called");
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeid}&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`

    const request = await axios.get(url).catch((error) => {
      console.log("erre", error)
    });
    const response = request;
    if (response && response.status !== 200) {
      // setError("Error fetching weather information");
    }
    if (response) {
      reviewResponse = response.data.result.reviews
      console.log("fetch Respone Review", response)
      console.log("fetch Respone Review varable", reviewResponse)
    }
  };
  useEffect(() => {
    reviewFetch()
  }, [])
  return (
    <div className="card">
      <img
        src={imageSource}
        alt="restaurant "
        className="restaurant-image"
      />
      <div className="container">
        <h4 className="restaurant-title">{name}</h4>
        <StarRatings
          rating={rating}
          starRatedColor="rgb(220,20,60)"
          starDimension="30px"
        />
        <h2>
          {/* <button onClick={reviewFetch}>sss</button> */}
          <Popup trigger={<button className="button" onClick={reviewFetch}> review </button>} modal>
            {close => (
              // <div>{name}</div>
              <div>
                <a className="close" onClick={close}>
                  &times;
                        </a>
                <div className="header"> {name}</div>

                {/* <div className="popupClass card">
                  <div>
                    <img
                      src={reviewResponse.data.result.reviews[0].profile_photo_url}
                      alt="Reviewer"
                      style={{ height: "100px" }}
                    />
                  </div>
                  <div className="ReviewNameRating">
                    <div><h1>{reviewResponse.data.result.reviews[0].author_name}</h1></div>
                    <div><h3>{reviewResponse.data.result.reviews[0].text}</h3></div>
                    <div> <StarRatings
                      rating={reviewResponse.data.result.reviews[0].rating}
                      starRatedColor="rgb(220,20,60)"
                      starDimension="30px"
                    />                </div>

                  </div>
                </div> */}





                {reviewResponse.map((restu) => {
                  // { <h1>aaaa</h1> }
                  return (
                    // { console.log("indic=vidual review sun") }
                    <div>
                      < IndividualReview
                        photo={restu.profile_photo_url}
                        name={restu.author_name}
                        rating={restu.rating}
                        text={restu.text}
                      />
                    </div>
                  )
                  // <div className="popupClass card">
                  //   <div>
                  //     <img
                  //       src={restu.photo}
                  //       alt="Reviewer"
                  //       style={{ height: "100px" }}
                  //     />
                  //   </div>
                  //   <div className="ReviewNameRating">
                  //     <div><h1>{restu.author_name}</h1></div>
                  //     <div><h3>{restu.text}</h3></div>
                  //     <div> <StarRatings
                  //       rating={restu.rating}
                  //       starRatedColor="rgb(220,20,60)"
                  //       starDimension="30px"
                  //     />                </div>

                  //   </div>
                  // </div>
                })
                }






                {/* <div className="actions">
                  <Popup
                    trigger={<button className="button"> Trigger </button>}
                    position="top center"
                    closeOnDocumentClick
                  >
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                      magni omnis delectus nemo, maxime molestiae dolorem numquam
                      mollitia, voluptate ea, accusamus excepturi deleniti ratione
                      sapiente! Laudantium, aperiam doloribus. Odit, aut.
                  </span>
                  </Popup>
                  <button
                    className="button"
                    onClick={() => {
                      console.log("modal closed ");
                      close();
                    }}
                  >
                    close modal
                </button>
                </div> */}
              </div>

            )}
          </Popup>
        </h2>
      </div>
    </div>
  );
};

export default RestaurantCard;
