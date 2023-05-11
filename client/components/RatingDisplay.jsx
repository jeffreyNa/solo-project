import React, { useState } from 'react';
import axios from 'axios';

import UserReview from './UserReview.jsx';
  
function RatingDisplay() {
  const [ratingData, setRatingData] = useState(null);
  const [inputDJ, setInputDJ] = useState('');
  const [notFound, setnotFound] = useState('false');
  console.log('AM I IN FRONTEND?');

  async function handleClick() {
    // my god, i needed this to stop the page from refreshing
    event.preventDefault(); // prevent default form submission behavior

    console.log('DO I EVEN HANDLECLICK?');
    try {
      console.log('Am I in this try block?');
      const response = await axios.get(`http://localhost:3000/ratings/${inputDJ}`);
      console.log(response.data);
      if (response) {
        setnotFound(false);
        setRatingData(response.data);
      } else {
        setnotFound(true);
      }
    } catch (err) {
      console.log('DID I ENTER HERE?');
      console.log('Error in handleClick ', err);
    }
  }

  function handleInputChange(event) {
    console.log(event);
    setInputDJ(event.target.value)
  }

  return (
    <div>
      <form>
        <input type="text" value={inputDJ} id="djSearch" onChange={handleInputChange} placeholder='Search up DJ' />
        <button type='submit' onClick={handleClick}>Search</button>
      </form>

      {notFound === true && <p>DJ Not Found</p>}

      {ratingData &&
        <div>
          <h2>{ratingData.name}</h2>
          <p>Average Rating: {ratingData.avgRating.toFixed(2)}</p>
          {ratingData && ratingData.rating.rating.map((rating, index) => (
            <div key={index}>
              <p>Rating: {rating}</p>
              <p>{ratingData.rating.description[index]}</p>
            </div>
          ))}
          <UserReview djName={ratingData.name} handleClick={handleClick}/>
        </div>
      }
    </div>
  );
}

export default RatingDisplay;