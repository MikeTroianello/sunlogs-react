import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/account/Login';
import Logout from './components/account/Logout';
import Signup from './components/account/Signup';
import Settings from './components/account/Settings';
import Create from './components/Create';
import View from './components/View';
import Profile from './components/Profile';
import ViewProfile from './components/ViewProfile';
import Navbar from './components/Navbar';

import AllProfiles from './components/profileFolder/AllProfiles';

import AuthService from './components/auth/auth-service';

import './App.css';
import './css/homepage.css';

class App extends React.Component {
  state = {
    loggedInUser: null,
    message: 'Not logged in',
    createdLogToday: false,
    errMessage: null
  };

  service = new AuthService();

  componentDidMount() {
    if (!this.state.loggedInUser) {
      this.isLoggedIn();
    }
  }

  testIt = thing => {
    console.log('TESTHING THING');
    return typeof thing === 'string' ? true : false;
  };

  setNewState = results => {
    this.setState({
      loggedInUser: results
    });
  };

  isLoggedIn = () => {
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
    console.log('isLoggedIn was just called');
    this.service
      .loggedin(day, year)
      .then(response => {
        this.setState(
          {
            loggedInUser: response,
            message: `Hello, ${response.username}!`,
            createdLogToday: response.createdToday
          },
          () => console.log('THE NEW STATE', this.state)
        );
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        });
      });
  };

  setUser = () => {
    let storedUser = JSON.parse(localStorage.getItem('user'));
    this.setState({
      username: storedUser.username,
      message: `Hello ${storedUser.username}`
    });
  };

  setError = err => {
    this.setState({
      errMessage: err
    });
  };

  logCreated = () => {
    console.log('logCreated has been called');
    this.setState({
      createdLogToday: true
    });
  };

  logout = () => {
    this.setState({
      loggedInUser: null,
      message: 'Have a great day!'
    });
    localStorage.removeItem('user');
  };

  getTheUser = userObj => {
    console.log('getTheUser was called');
    this.setState(
      {
        loggedInUser: userObj,
        message: `Hello, ${userObj.username}!`,
        createdLogToday: userObj.createdToday
      },
      () => {
        console.log('NEW STATE', this.state);
      }
    );
  };

  render() {
    // if (this.state.loggedInUser) {
    //   return <Redirect to='/profile' />;
    // }
    return (
      <div>
        <div className='App'>
          <Navbar
            info={this.state}
            logout={this.logout}
            history={this.history}
          />
        </div>
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <Home
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
            render={props => (
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
            render={props => (
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
            render={props => (
              <AllProfiles
                {...props}
                user={this.state.loggedInUser}
                profileSelf={true}
              />
            )}
          />
          {/* <Route
            exact
            path='/profile'
            render={props => (
              <Profile {...props} user={this.state.loggedInUser} />
            )}
          /> */}
          <Route
            exact
            path='/logout'
            render={props => (
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
            render={props => (
              <Create
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
            render={props => (
              <View
                {...props}
                createdToday={this.state.createdLogToday}
                loggedInUser={this.state.loggedInUser}
              />
            )}
          />
          <Route
            path='/settings'
            render={props => (
              <Settings
                {...props}
                loggedInUser={this.state.loggedInUser}
                isLoggedIn={this.isLoggedIn}
              />
            )}
          />
          <Route
            path='/view-profile/:id'
            render={props => (
              <AllProfiles
                {...props}
                setUser={this.setUser}
                profileSelf={false}
              />
            )}
          />
          {/* <Route
            path='/view-profile/:id'
            render={props => <ViewProfile {...props} setUser={this.setUser} />}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
