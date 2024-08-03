import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import {
  loggedin,
  changeInfo,
  changePass,
  deleteUser,
} from '../../auth/authService';
import { useGetLoginInfo } from '../../hooks/useGetLoginInfo';
import Header from './subcomponents/Header';
import HideProfile from './subcomponents/preferences/HideProfile';
import MakeJournalsPrivate from './subcomponents/preferences/MakeJournalsPrivate';
import HideName from './subcomponents/preferences/HideName';
import ChangePreferenceButton from './subcomponents/preferences/ChangePreferenceButton';
import Preferences from './subcomponents/preferences/Preferences';

const Settings = (props) => {
  const [state, setState] = useState({
    message: null,
    // hideProfile: false,
    // privateJournalDefault: false,
    // hideCreatorDefault: false,
    oldPhone: null,
    // phone: null,
    oldEmail: null,
    // email: null,
    oldPass: null,
    newPass: null,
    confirmDelete: null,
    deletePassword: null,
    // id: null,
  });

  const { history } = useHistory();

  const { isLoggedIn, loggedInUser } = props || {};
  const loginInfo = useGetLoginInfo(loggedInUser);
  const {
    email: currentEmail,
    hideCreatorDefault,
    hideProfile,
    phone: currentPhone,
    privateJournalDefault,
  } = loginInfo || {};

  const toggle = (e) => {
    let statePiece = e.target.name;
    setState((prevState) => ({
      [statePiece]: !prevState[statePiece],
    }));
  };

  const handleChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };

  const changeTheInfo = () => {
    changeInfo(state).then((results) => {
      isLoggedIn(results);
      history.push('/profile');
    });
  };

  const changePass = () => {
    changePass(state).then((results) => {
      isLoggedIn(results);
      history.push('/');
    });
  };

  const deleteUser = () => {
    deleteUser(state.confirmDelete).then(() => {
      history.push('/');
    });
  };
  console.log('!hideProfile', hideProfile);
  return (
    <div className='settings-top'>
      <div className='settings'>
        <Header />
        <Preferences
          hideProfile={hideProfile}
          privateJournalDefault={privateJournalDefault}
          hideCreatorDefault={hideCreatorDefault}
          changeTheInfo={changeTheInfo}
          onClick={toggle}
        />
        <div className='settings-change-info'>
          <h1>Change your Account Info</h1>
          <div>
            <h3>Your old phone number: {currentPhone}</h3>
            <div className='change-account-sub-box'>
              <span>Change Phone # </span>
              <input
                type='tel'
                autoComplete='off'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                name='phone'
                placeholder='+3(141)592-6535'
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <h3>Your old email: {currentEmail}</h3>
            <div className='change-account-sub-box'>
              <span>Change email</span>
              <input
                type='email'
                name='email'
                autoComplete='off'
                placeholder='name@email.com'
                onChange={handleChange}
              />
            </div>
          </div>
          <button className='settings-change-button' onClick={changeTheInfo}>
            Change Info
          </button>
          <div className='settings-change-password'>
            <h3>Change Password</h3>
            <div className='change-password-super-box'>
              <div className='change-password-box'>
                <div className='change-password-sub-box'>
                  <span>New Password</span>
                  <input
                    type='password'
                    name='oldPass'
                    autoComplete='off'
                    placeholder='********'
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className='change-password-sub-box'>
                  <span>Confirm Password</span>
                  <input
                    type='password'
                    name='newPass'
                    autoComplete='off'
                    placeholder='********'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <br />
          <button className='settings-change-button' onClick={changeTheInfo}>
            Change Password
          </button>
        </div>
        <div className='settings-delete'>
          <h1>Delete Profile</h1>
          <h4>
            <span className='red'>WARNING:</span> If you delete your profile,
            this cannot be undone!
          </h4>
          <p className='settings-delete-warning'>
            <i>
              Note: <br />
              if you delete your account, your logs will stay intact,
              <br />
              for mood aggregation purposes. <br />
              All of your journals will be erased, as will the names of the
              logs.
            </i>
          </p>
          <span>
            <b>Type in your Username Before Deletion</b>
          </span>
          <br></br>
          <input
            className='confirmDelete'
            name='confirmDelete'
            autoComplete='off'
            placeholder='make sure this is what you want...'
            style={{ fontSize: '1em', width: '250px' }}
            onChange={handleChange}
          />
          <br />
          <button className='delete' onClick={deleteUser}>
            DELETE IT!
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Settings);
