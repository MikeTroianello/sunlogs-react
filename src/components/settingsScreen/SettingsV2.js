import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeInfo } from '../../auth/authService';
import { useGetLoginInfo } from '../../hooks/useGetLoginInfo';
import Header from './subcomponents/Header';
import Preferences from './subcomponents/preferences/Preferences';
import ChangePassword from './subcomponents/accountInfo/ChangePassword';
import PhoneInput from './subcomponents/accountInfo/PhoneInput';
import EmailInput from './subcomponents/accountInfo/EmailInput';

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
          <PhoneInput currentPhone={currentPhone} onChange={handleChange} />
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
          <EmailInput currentEmail={currentEmail} onChange={{ handleChange }} />
          <button className='settings-change-button' onClick={changeTheInfo}>
            Change Info
          </button>
          <ChangePassword onChange={handleChange} />

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
