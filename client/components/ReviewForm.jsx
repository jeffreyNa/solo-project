import React, { useState } from 'react';
const axios = require('axios');

function ReviewForm(props) {
  const { handleInputChange, inputValue, djName } = props;  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log('IN HANDLESUBMIT');
      console.log('Is the name passed? ', props.djName);
      const response = await axios.post(`http://localhost:3000/ratings`, {
        name: props.djName,
        rating: [rating],
        description: [review],
      });
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    // handle the form submission here
  }

  function handleRatingChange(event) {
    setRating(event.target.value);
  }

  function handleReviewChange(event) {
    setReview(event.target.value);
  }

  return (
    <div id="reviewForm">
      <br />
      <input value={rating} type="number" name="rating" id="formRating" placeholder="Rate out of 5" onChange={handleRatingChange}/> 
      <br />
      <textarea value={review} onChange={handleReviewChange} name="formReview" id="review" placeholder="Type review here" />
      <button type='submit' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default ReviewForm;
