import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToken, getToken } from './redux/actionCreators/userActionCreator';
import Login from './components/account/Login';
import Logout from './components/account/Logout';
import Signup from './components/account/Signup';
import Settings from './components/account/Settings';
import CreateLog from './components/CreateLog';
import View from './components/View';
import Navbar from './components/Navbar/Navbar';
import AllProfiles from './components/profileFolder/AllProfiles';
import AuthService from './auth/auth-service';
import { loggedin } from './auth/authService';
import './App.css';
import './css/homepage.css';
import LandingPage from './components/LandingPage';
import ProfilesV2 from './components/profileFolder/ProfilesV2';

class Main extends Component {
  state = {
    loggedInUser: null,
    message: 'Not logged in',
    createdLogToday: false,
    errMessage: null,
  };

  service = new AuthService();

  componentDidMount = () => {
    if (!this.state.loggedInUser) {
      this.isLoggedIn();
    }
  };

  testIt = (thing) => {
    return typeof thing === 'string';
  };

  setNewState = (results) => {
    this.setState({
      loggedInUser: results,
    });
  };

  isLoggedIn = async () => {
    try {
      await this.props.getToken();
      this.service = new AuthService(this.props.user.token);
      let today = new Date();
      var start = new Date(today.getFullYear(), 0, 0);
      var diff =
        today -
        start +
        (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      let a = today.toString().split(' ');
      var day = Math.floor(diff / oneDay);
      let year = Number(a[3]);
      let response = await loggedin(day, year);
      await this.props.setToken(response.token);
      this.setState({
        loggedInUser: response.user,
        message: `Hello, ${response.user.username}!`,
        createdLogToday: response.user.createdToday,
      });
    } catch (err) {
      this.setState({
        loggedInUser: false,
      });
    }
  };

  setUser = () => {
    let storedUser = JSON.parse(localStorage.getItem('user'));
    this.setState({
      username: storedUser.username,
      message: `Hello ${storedUser.username}`,
    });
  };

  setError = (err) => {
    this.setState({
      errMessage: err,
    });
  };

  logCreated = () => {
    this.setState({
      createdLogToday: true,
    });
  };

  logout = () => {
    this.setState({
      loggedInUser: null,
      message: 'Have a great day!',
    });
    localStorage.removeItem('user');
  };

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
      message: `Hello, ${userObj.username}!`,
      createdLogToday: userObj.createdToday,
    });
  };

  render() {
    return (
      <div>
        <div className='App'>
          <Navbar
            info={this.state}
            logout={this.logout}
            history={this.history}
            {...this.state}
          />
        </div>
        {/* <Routes /> */}
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => (
              <LandingPage
                {...props}
                err={this.state.errMessage}
                setError={this.setError}
                getUser={this.getTheUser}
              />
            )}
          />
          <Route
            exact
            path='/signup'
            render={(props) => (
              <Signup
                {...props}
                testIt={this.testIt}
                getUser={this.getTheUser}
              />
            )}
          />
          <Route
            exact
            path='/login'
            render={(props) => (
              <Login
                {...props}
                testIt={this.testIt}
                getUser={this.getTheUser}
              />
            )}
          />
          <Route
            exact
            path='/profile'
            render={(props) => (
              <ProfilesV2
                {...props}
                user={this.state.loggedInUser}
                profileSelf={true}
              />
            )}
          />
          <Route
            exact
            path='/logout'
            render={(props) => (
              <Logout
                {...props}
                logout={this.logout}
                user={this.state.loggedInUser}
              />
            )}
          />
          <Route
            exact
            path='/create'
            render={(props) => (
              <CreateLog
                {...props}
                logCreated={this.logCreated}
                user={this.state.loggedInUser}
                createdToday={this.state.createdLogToday}
                setError={this.setError}
                testIt={this.testIt}
              />
            )}
          />
          <Route
            path='/view'
            render={(props) => (
              <View
                {...props}
                createdToday={this.state.createdLogToday}
                loggedInUser={this.state.loggedInUser}
              />
            )}
          />
          <Route
            path='/settings'
            render={(props) => (
              <Settings
                {...props}
                loggedInUser={this.state.loggedInUser}
                isLoggedIn={this.isLoggedIn}
              />
            )}
          />
          <Route
            path='/view-profile/:id'
            render={(props) => (
              <AllProfiles
                {...props}
                setUser={this.setUser}
                profileSelf={false}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setToken: (token) => setToken(token),
  getToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
