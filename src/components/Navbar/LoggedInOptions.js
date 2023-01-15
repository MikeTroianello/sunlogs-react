import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/navbar.css';

const LoggedInOptions = ({ createdLogToday }) => {
  return (
    <div className='nav-links'>
      <Link to='/profile'>Profile</Link>
      {!createdLogToday && <Link to='/create'>Create</Link>}
      <Link to='/view'>View</Link>
      <Link to='/settings'>Settings</Link>
      <Link to='/logout'>Logout</Link>
    </div>
  );
};

export default LoggedInOptions;
