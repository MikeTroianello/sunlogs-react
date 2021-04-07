import React from 'react';
import { Link } from 'react-router-dom';

import '../css/navbar.css';

export default function Navbar(props) {
  return (
    <div className='navbar'>
      <h2 className='logged-in-user'>{props.info.message}</h2>
      <div className='nav-links'>
        {!props.info.loggedInUser && (
          <div className='yeet'>
            <Link to='/'>Home</Link>
          </div>
        )}
        {props.info.loggedInUser && (
          <div>
            <Link to='/profile'>Profile</Link>
          </div>
        )}
        {props.info.loggedInUser && !props.info.createdLogToday && (
          <div>
            <Link to='/create'>Create</Link>
          </div>
        )}
        <div>
          <Link to='/view'>View</Link>
        </div>
        {props.info.loggedInUser && (
          <div>
            <Link to='/settings'>Settings</Link>
          </div>
        )}
        {props.info.loggedInUser && <Link to='/logout'>Logout</Link>}
      </div>
    </div>
  );
}
