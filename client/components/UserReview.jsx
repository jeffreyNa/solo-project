import React, { useState } from 'react';
import ReviewForm from './ReviewForm.jsx';

function UserReview(props) {
  const [showInputs, setShowInputs] = useState(false);

  function handleClick(event) {
    event.preventDefault();
    setShowInputs(true);
    console.log('Someone clicked');
  }

  return (
    <form id="userReview">
      <button type='submit' onClick={handleClick}>Submit a review</button>
      {showInputs && 
      <>
        <ReviewForm handleInputChange={props.handleInputChange} inputValue={props.inputValue} djName={props.djName} />
      </>
      }
    </form>
  )
}

export default UserReview;

