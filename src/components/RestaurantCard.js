import React, { useEffect, useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import Context from "../Context";
import Rating from '@material-ui/lab/Rating';
import Popup from "reactjs-popup";
import axios from "axios";
import IndividualReview from "./IndividualReview"

const RestaurantCard = ({ name, imageSource, rating, placeid }) => {
  // let reviewResponse
  const [reviewResponse, setReviewResponse] = useState([])
  const { setAddReviewFlag, addReviewFlag } = useContext(Context);
  const [reviewName, setReviewName] = useState('AAA')
  const [reviewText, setReviewText] = useState('DDD')
  const [reviewRating, setReviewRating] = useState('5')
  let reviewDetails = []

  const reviewFetch = async () => {
    console.log("fetch review called");
    if (placeid != null) {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeid}&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`

      const request = await axios.get(url).catch((error) => {
        console.log("erre", error)
      });

      const response = request;

      if (response && response.status !== 200) {
        // setError("Error fetching weather information");
      }
      if (response) {
        // reviewResponse = response.data.result.reviews
        setReviewResponse(response.data.result.reviews)
        console.log("fetch Respone Review", response)
        console.log("fetch Respone Review varable", reviewResponse)
      }
    } else {
      console.log("doing reviewresponse null")
      // reviewResponse = []
      setReviewResponse([])
    }
  };
  useEffect(() => {
    console.log("useeefect restcard")
    reviewFetch()
  }, [])

  const addReview = () => {
    console.log("addReview clicked before", reviewResponse)
    // preventDefault()


    // setAddReviewFlag(true)

    console.log("addReview clicked")
  }


  const handleReviewSubmit = (e, reviewName, setReviewName, reviewRating, setReviewRating, reviewText) => {
    e.preventDefault()
    // console.log("adred coo", tempCoords)
    reviewDetails = {
      author_name: reviewName,
      rating: parseInt(reviewRating),
      profile_photo_url: "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png"

    }
    // reviewResponse = [...reviewResponse, reviewDetails]
    setReviewResponse([...reviewResponse, reviewDetails])
    console.log("reviewText", reviewDetails)
    console.log("reviewText resoonn", reviewResponse)
    // reviewFetch()
  }
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
              <div >
                <a className="close" onClick={close}>
                  &times;
                        </a>
                <div className="header"> {name}
                  <Popup
                    trigger={<button className="button"> Add Review </button>}

                  // closeOnDocumentClick
                  >
                    <form onSubmit={(e) => handleReviewSubmit(e, reviewName, setReviewName, reviewRating, setReviewRating, reviewText)}>
                      <input type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} />
                      <input type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                      <Rating
                        name="simple-controlled"
                        value={reviewRating}
                        onChange={(event, newValue) => {
                          if (newValue != null) {
                            console.log("New Value", newValue)
                            // setReviewRating(newValue);
                          }
                        }}
                      />
                      <button>submit</button>
                    </form>
                  </Popup>
                  {/* <button onClick={addReview}>add review</button> */}
                </div>

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
