import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { changeInfo } from '../../auth/authService';
import { useGetLoginInfo } from '../../hooks/useGetLoginInfo';
import Header from './subcomponents/Header';
import Preferences from './subcomponents/preferences/Preferences';
import ChangeAccountInfo from './subcomponents/accountInfoSections/ChangeAccountInfo';
import DeleteProfileSection from './subcomponents/accountInfoSections/DeleteProfileSection';

const Settings = (props) => {
  const [state, setState] = useState({
    message: null,
    oldPhone: null,
    oldEmail: null,
    oldPass: null,
    newPass: null,
    confirmDelete: null,
    deletePassword: null,
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
    setState((prevState) => ({
      [e.target.name]: !prevState[e.target.name],
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
        <ChangeAccountInfo
          currentPhone={currentPhone}
          currentEmail={currentEmail}
          onChange={handleChange}
          onClick={changeTheInfo}
        />
        <DeleteProfileSection onChange={handleChange} onClick={deleteUser} />
      </div>
    </div>
  );
};

export default Settings;
