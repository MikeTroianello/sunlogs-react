import React, { useState } from 'react';
import Login from '../account/Login';
import Signup from '../account/Signup';

const HomepageTop = ({ logIt }) => {
  const [isSignupShowing, setIsSignupShowing] = useState(false);

  const cardFlipHandler = () => {
    setIsSignupShowing(!isSignupShowing);
  };

  const cardClass = isSignupShowing ? 'card flipped' : 'card';

  const buttonText = isSignupShowing
    ? 'Go back to Login'
    : 'Create an Account Now!';

  return (
    <div className='homepage-top'>
      <div className='homepage-greet'>
        <h1>SUNLOGS</h1>
        <p>How much does weather affect your life?</p>
      </div>
      <div className='signup-login-container'>
        <section className='container'>
          <div className={cardClass}>
            <div className='front card-div'>
              <Login logIt={logIt} />
            </div>
            <div className='back card-div'>
              <Signup logIt={logIt} />
            </div>
          </div>
        </section>
        <button className='create-button' onClick={cardFlipHandler}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default HomepageTop;
