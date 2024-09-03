import React, { Component } from 'react';
import AuthService from '../../auth/auth-service';
import { connect } from 'react-redux';
import { logOutRedux } from '../../redux/actionCreators/userActionCreator';
import { logout } from '../../auth/authService';

class Logout extends Component {
  service = new AuthService();

  componentDidMount() {
    logout().then(() => {
      this.props.logout();
      this.props.logOutRedux();
      this.props.history.push('/');
    });
  }

  render() {
    return <div />;
  }
}

const mapDispatchToProps = {
  logOutRedux,
};

export default connect(null, mapDispatchToProps)(Logout);
