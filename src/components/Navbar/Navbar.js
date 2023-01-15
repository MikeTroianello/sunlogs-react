import React from 'react';
import LoggedInOptions from './LoggedInOptions';
import LoggedOutOptions from './LoggedOutOptions';

import '../../css/navbar.css';

const Navbar = ({ info: { message, loggedInUser, createdLogToday } }) => {
  return (
    <div className='navbar'>
      <h2 className='logged-in-user'>{message}</h2>
      {loggedInUser ? (
        <LoggedInOptions createdLogToday={createdLogToday} />
      ) : (
        <LoggedOutOptions />
      )}
    </div>
  );
};

export default Navbar;
