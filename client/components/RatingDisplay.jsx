import React, { useState } from 'react';
import axios from 'axios';

import UserReview from './UserReview.jsx';
  
function RatingDisplay() {
  const [ratingData, setRatingData] = useState(null);
  const [inputDJ, setInputDJ] = useState('');
  console.log('AM I IN FRONTEND?');

  async function handleClick() {
    // my god, i needed this to stop the page from refreshing
    event.preventDefault(); // prevent default form submission behavior

    console.log('DO I EVEN HANDLECLICK?');
    try {
      console.log('Am I in this try block?');
      const response = await axios.get(`http://localhost:3000/ratings/${inputDJ}`);
      console.log(response);
      setRatingData(response.data);
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

      {ratingData &&
        <div>
        <h2>{ratingData.name}</h2>
        {ratingData.rating.map((rating, index) => (
          <div key={index}>
            <p>Rating: {rating}</p>
            <p>Reviews: {ratingData.description[index]}</p>
            <UserReview djName={ratingData.name} handleClick={handleClick}/>
          </div>
        ))}
        </div>
      }
    </div>
  );
}

export default RatingDisplay;