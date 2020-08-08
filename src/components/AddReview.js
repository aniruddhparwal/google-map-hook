import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import Rating from '@material-ui/lab/Rating';
import '../styles/style.css'


const AddReview = () => {
    const { addReviewFlag, setAddReviewFlag, } = useContext(Context);
    const [reviewName, setReviewName] = useState('')
    const [reviewText, setReviewText] = useState('')
    const [reviewRating, setReviewRating] = useState('')
    let reviewDetails = []
    useEffect(() => {
        console.log("AddRest")
        setAddReviewFlag(true)
    }, [])
    const handleSubmit = (e, reviewName, setReviewName, reviewRating, setReviewRating, reviewText) => {
        e.preventDefault()
        // console.log("adred coo", tempCoords)
        reviewDetails = {
            author_name: reviewName,
            rating: reviewRating,
            profile_photo_url: "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png"

        }
        // setRestaurants([...restaurants, reviewDetails])

        console.log("resDetsils", reviewDetails)
        console.log("formsubmit")
        setAddReviewFlag(false)
    }

    console.log("AddReview")
    return (
        <div className="addrest">
            <h1>Add Review </h1>
            {/* <form onSubmit={(e) => handleSubmit(e, reviewName, setReviewName, reviewRating, setReviewRating, reviewText)}>
                <input type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} />
                <input type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                <Rating
                    name="simple-controlled"
                    value={reviewRating}
                    onChange={(event, newValue) => {
                        if (newValue != null) {
                            console.log("New Value", newValue)
                            setReviewRating(newValue);
                        }
                    }}
                />
                <button>submit</button>
            </form> */}
        </div>
    )
}

export default AddReview