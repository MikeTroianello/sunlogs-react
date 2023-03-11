import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import { loggedin } from '../auth/authService';

import mockLog from '../testing/mockLog.json';

import Login from './account/Login';
import Signup from './account/Signup';

import Log from './view-logs/Log';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt as arrow } from '@fortawesome/free-solid-svg-icons';

// import video from './video/Pexels Videos 1893623.mp4';

import '../css/homepage.css';

export default class Home extends Component {
  state = {
    date: new Date(),
    message: 'This is the Home Page',
    err: false,
    signup: false,
  };

  service = new AuthService();

  componentDidMount() {
    if (this.props.err && !this.state.err) {
      this.setState({
        message: 'You already created a log today!',
        err: true,
      });
    }
    this.props.setError(null);
    this.checkIfLoggedIn();
    return <div>this.state.message</div>;
  }

  checkIfLoggedIn = () => {
    loggedin()
      .then((results) => {
        if (results) this.props.history.push('/profile');
      })
      .catch((error) => console.log(error));
  };

  logIt = (results) => {
    this.props.getUser(results);
    this.props.history.push('/profile');
  };

  toggle = () => {
    this.setState((prevState) => ({
      signup: !prevState.signup,
    }));
  };

  backToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    let toggle;
    let thing;
    this.state.signup
      ? (toggle = 'Go back to Login')
      : (toggle = 'or, Create an Account Now!');
    this.state.signup ? (thing = 'card flipped') : (thing = 'card');
    console.log('mockLog', mockLog);
    return (
      <div>
        <div className='homepage-top'>
          <div className='homepage-greet'>
            <h1>SUNLOGS</h1>
            <p>How much does weather affect your life?</p>
          </div>
          <div className='signup-login-container'>
            <section className='container'>
              <div className={thing}>
                <div className='front card-div'>
                  {' '}
                  <Login logIt={this.logIt} />
                </div>
                <div className='back card-div'>
                  <Signup logIt={this.logIt} />
                </div>
              </div>
            </section>
            <button className='create-button' onClick={this.toggle}>
              {toggle}
            </button>
          </div>
        </div>
        <div className='homepage-separation'></div>
        <div className='homepage-sad'>
          <h2>Did you know:</h2>
          <h4>
            Over 3 MILLION Americans suffer from Seasonal Affective Disorder, or
            SAD, every year
          </h4>
          <p>
            SAD can affect nearly every aspect of a person's life, from work, to
            relationships, to personal health. <br />
            It was this reason that Sunlogs was created
          </p>
        </div>
        <div className='homepage-sunlog'>
          <div className='sunlog-description'>
            <h2>What is Sunlogs?</h2>
            <p>
              Sunlogs is a way to record your daily <strong>Mood</strong> and
              how <strong>Productive</strong> you thought you were.{' '}
            </p>
            <p>
              You can also create a journal for any feelings you might want to
              jot down.
            </p>{' '}
            <p>
              These logs are then tied to the weather in your county, and will
              compare correlate mood respectively
            </p>
          </div>
          <div className='sunlog-example'>
            <Log log={mockLog} test={true} />
            <h4>(Your logs can be as private as you want them to be)</h4>
          </div>
        </div>
        <div>
          <h1 className='sunlog-create'>CREATE AN ACCOUNT AND SEE!</h1>
          <div className='footer'>
            <div>
              <button className='footer-button' onClick={this.backToTop}>
                Back to Top
                <FontAwesomeIcon icon={arrow} size='2x' />
              </button>
            </div>
            <div className='footer-contact'>
              <p>Created by Mike Troianello</p>
              <p>
                Contact me at{' '}
                <a href='mailto:mike@troianello.co'> mike@troianello.co</a>
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
            </div>
            <div className='footer-logo'>
              <h1 className='mt-logo'>Mt</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
