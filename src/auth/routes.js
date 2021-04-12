import React from 'react'
import { Route, Switch } from 'react-router-dom';


import Home from '../components/Home';
import Login from '../components/account/Login';
import Logout from '../components/account/Logout';
import Signup from '../components/account/Signup';
import Settings from '../components/account/Settings';
import Create from '../components/Create';
import View from '../components/View';

import AllProfiles from '../components/profileFolder/AllProfiles';


 const Routes = (props) => {
  return (
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
  )
}

export default Routes