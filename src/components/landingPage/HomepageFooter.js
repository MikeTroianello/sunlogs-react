import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt as arrow } from '@fortawesome/free-solid-svg-icons';

const HomepageFooter = ({ onClick }) => {
  return (
    <div className='footer'>
      <div>
        <button className='footer-button' onClick={onClick}>
          Back to Top
          <FontAwesomeIcon icon={arrow} size='2x' />
        </button>
      </div>
      <footer className='footer-contact'>
        <p>Created by Mike Troianello</p>
        <p>
          Contact me at{' '}
          <a href='mailto:mike@troianello.co'>mike@troianello.co</a>
        </p>
        <p>
          Visit my personal website{' '}
          <a
            href='http://troianello.co'
            target='_blank'
            rel='noopener noreferrer'
          >
            troianello.co
          </a>
        </p>
      </footer>
      <div className='footer-logo'>
        <h1 className='mt-logo'>Mt</h1>
      </div>
    </div>
  );
};

export default HomepageFooter;
