import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import {
  loggedin,
  changeInfo,
  changePass,
  deleteUser,
} from '../../auth/authService';

const Settings = (props) => {
  const [state, setState] = useState({
    message: null,
    hideProfile: false,
    privateJournalDefault: false,
    hideCreatorDefault: false,
    oldPhone: null,
    phone: null,
    oldEmail: null,
    email: null,
    oldPass: null,
    newPass: null,
    confirmDelete: null,
    deletePassword: null,
    id: null,
  });

  const { history } = useHistory();

  if (props.loggedInUser) {
    const {
      email,
      hideCreatorDefault,
      hideProfile,
      phone,
      privateJournalDefault,
      id,
    } = props.loggedInUser;

    setState({
      hideProfile: hideProfile,
      privateJournalDefault: privateJournalDefault,
      hideCreatorDefault: hideCreatorDefault,
      oldPhone: phone,
      oldEmail: email,
      id: id,
    });
  } else {
    loggedin().then((response) => {
      setState({
        hideProfile: response.hideProfile,
        privateJournalDefault: response.privateJournalDefault,
        hideCreatorDefault: response.hideCreatorDefault,
        oldPhone: response.phone,
        oldEmail: response.email,
        id: response.id,
      });
    });
  }

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

  changeInfo = () => {
    changeInfo(state).then((results) => {
      props.isLoggedIn(results);
      history.push('/profile');
    });
  };

  changePass = () => {
    changePass(state).then((results) => {
      props.isLoggedIn(results);
      history.push('/');
    });
  };

  deleteUser = () => {
    deleteUser(state.confirmDelete).then(() => {
      history.push('/');
    });
  };

  return (
    <div className='settings-top'>
      <div className='settings'>
        <h1>Your Settings</h1>
        <i>
          Note: pressing any of the save buttons will update all fields you have
          changed. <br />
          They are placed in each section for convenience
        </i>
        <div className='settings-change-preferences'>
          <h1>Preferences</h1>
          <div>
            <h3>Hide your profile</h3>
            <p>This makes sure people will not be able to view your profile.</p>
            <p className='settings-aside'>
              (They still can see your name on your logs, if you choose to not
              hide them)
            </p>
            <h3>{state.hideProfile}</h3>
            <h4 className={state.hideProfile ? 'red' : 'green'}>
              You currently {state.hideProfile === true && <span>DO NOT </span>}
              allow others to view your profile
            </h4>
            <button
              className='settings-change-preferences-button'
              name='hideProfile'
              onClick={toggle}
            >
              {state.hideProfile ? 'Show' : 'Hide'} profile
            </button>
          </div>
          <div>
            <h3>Make Journals Private by Default</h3>
            <h4 className={state.privateJournalDefault ? 'red' : 'green'}>
              Your Journals are{' '}
              {state.privateJournalDefault ? 'HIDDEN' : 'shown'} by default
            </h4>
            <button
              className='settings-change-preferences-button'
              name='privateJournalDefault'
              onClick={toggle}
            >
              {state.privateJournalDefault ? 'Show' : 'Hide'} by Default
            </button>
          </div>
          <div>
            <h3>Hide your name by Default</h3>
            <h4 className={state.hideCreatorDefault ? 'red' : 'green'}>
              Your name is {state.hideCreatorDefault ? 'HIDDEN' : 'shown'} by
              default
            </h4>
            <button
              className='settings-change-preferences-button'
              name='hideCreatorDefault'
              onClick={toggle}
            >
              {state.hideCreatorDefault ? 'Show' : 'Hide'} by Default
            </button>
          </div>
          <button className='settings-change-button' onClick={changeInfo}>
            Change Preferences
          </button>
        </div>
        <div className='settings-change-info'>
          <h1>Change your Account Info</h1>
          <div>
            <h3>Your old phone number: {state.oldPhone}</h3>
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
            <h3>Your old email: {state.oldEmail}</h3>
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
          <button className='settings-change-button' onClick={changeInfo}>
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
          <button className='settings-change-button' onClick={changeInfo}>
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
