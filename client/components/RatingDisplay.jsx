import React, { useState } from 'react';
import axios from 'axios';

import UserReview from './UserReview.jsx';
  
function RatingDisplay() {
  const [ratingData, setRatingData] = useState(null);
  const [inputDJ, setInputDJ] = useState('');
  const [notFound, setnotFound] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  console.log('AM I IN FRONTEND?');

  async function handleClick() {
    // my god, i needed this to stop the page from refreshing
    event.preventDefault(); // prevent default form submission behavior

    console.log('DO I EVEN HANDLECLICK?');
    try {
      console.log('Am I in this try block?');
      const response = await axios.get(`http://localhost:3000/ratings/${inputDJ}`);
      console.log('WHAT IS MY STATUS? ', response.status);
      if (response.data.rating) {
        setRatingData(response.data);
      } else {
        setShowReviewForm(true);
        setnotFound(true);
      }
    } catch (err) {
      console.log('DID I ENTER HERE?');
      console.log('Error in handleClick ', err);
    }
  }

  function handleInputChange(event) {
    console.log('Changing: ', event);
    setInputDJ(event.target.value)
  }

  return (
    <div>
      <form id="userForm">
        <input type="text" value={inputDJ} id="djSearch" onChange={handleInputChange} placeholder='Search up DJ' />
        <button type='submit' id="djSearchSubmit" onClick={handleClick}>Search</button>
      </form>

      {notFound && 
        <p>DJ Not Found</p>
      }

      {ratingData &&
        <div id="reviews">
          <h2>{ratingData.rating.name}</h2>
          <h3>Overall Rating: {ratingData.avgRating.toFixed(2)} from {ratingData.ratingCount} users</h3>
          <UserReview djName={ratingData.rating.name} handleClick={handleClick}/>
          {ratingData && ratingData.rating.rating.map((rating, index) => (
            <div id="userReview" key={index}>
              <p>Rating: {rating}</p>
              <p>{ratingData.rating.description[index]}</p>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default RatingDisplay;