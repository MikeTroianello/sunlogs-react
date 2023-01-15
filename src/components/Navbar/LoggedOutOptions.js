import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/navbar.css';

const LoggedOutOptions = () => {
  return (
    <div className='nav-links'>
      <Link to='/'>Home</Link>
      <Link to='/view'>View</Link>
    </div>
  );
};

export default LoggedOutOptions;
