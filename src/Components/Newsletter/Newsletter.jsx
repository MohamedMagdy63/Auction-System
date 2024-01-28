import './style.css';
import React from 'react';


const Newsletter = () => {
  return (
   
   <div className="newSletterContainer">
    <div className="backgroundContainer">
      <div className="blockContainer">
        <div className="titleOfContainer">
          GET IN TOUCH
        </div>
        <div className="inutContainers">
          <input type="text" className='inputContainer' name="Name" placeholder='Name' required id="" />
        </div>
        <div className="inutContainers">
          <input type="text" className='inputContainer' name="email address" placeholder='Email Address' required id="" />
        </div>
        <div className="inutContainers">
          <textarea type="text" className='textAreaContainer' name="Content" placeholder='Content' required id="" />
        </div>
        <div className="submitContainer">
          <button className='submitButton'>Send</button>
        </div>
        <div className="blackContainer">
          <p>Auction@mail.com</p>
          <span>02 23790811</span>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Newsletter;