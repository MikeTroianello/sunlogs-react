import React, { useEffect } from 'react';
import AuthService from '../../auth/auth-service';
import { connect, useDispatch } from 'react-redux';
import { logOutRedux } from '../../redux/actionCreators/userActionCreator';
import { logout as logoutService } from '../../auth/authService';
import { useHistory } from 'react-router-dom';

export const useLogout = (props) => {
  const service = new AuthService();
  const history = useHistory();

  const { logOutRedux } = useDispatch();

  const logout = async () => {
    logoutService();
    logOutRedux();
    history.push('/');
  };

  return { logout };
};
