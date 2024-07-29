import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loggedin } from '../auth/authService';
import '../css/homepage.css';
import DidYouKnow from './landingPage/DidYouKnow';
import HomepageTop from './landingPage/HomepageTop';
import WhatIsSunlogs from './landingPage/WhatIsSunlogs';
import HomepageFooter from './landingPage/HomepageFooter';

const LandingPage = ({ getUser }) => {
  const history = useHistory();

  const checkIfLoggedIn = useCallback(async () => {
    const results = await loggedin();
    if (results) {
      history.push('/profile');
    }
  }, [history]);

  useEffect(() => {
    checkIfLoggedIn();
  }, [checkIfLoggedIn]);

  const logIt = (results) => {
    getUser(results);
    history.push('/profile');
  };

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <HomepageTop logIt={logIt} />
      <div className='homepage-separation'></div>
      <DidYouKnow />
      <WhatIsSunlogs />
      <h1 className='sunlog-create'>CREATE AN ACCOUNT AND SEE!</h1>
      <HomepageFooter onClick={backToTop} />
    </div>
  );
};

export default LandingPage;
