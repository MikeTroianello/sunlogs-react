import React, { Component } from 'react';
import AuthService from '../auth/auth-service';

export default class Login extends Component {
  state = {
    message: null,
    user: '',
    username: 'michael',
    password: 'michael'
  };
  service = new AuthService();

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if (!username) {
      this.setState({
        message: `You must include a username`
      });
    } else if (!password) {
      this.setState({
        message: `You must include a password`
      });
    } else {
      let today = new Date();
      var start = new Date(today.getFullYear(), 0, 0);
      var diff =
        today -
        start +
        (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      let a = today.toString().split(' ');
      var day = Math.floor(diff / oneDay);
      let year = a[3];
      this.service
        .login(username, password, day, year)
        .then(results => {
          this.setState({
            username: '',
            password: '',
            message: results.message || null
          });

          if (!results.message) {
            localStorage.setItem('user', JSON.stringify(results));
            this.props.logIt(results);
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            message: `Incorrect Username or Password`
          });
        });
    }
  };

  render() {
    return (
      <div>
        <div className='signup'>
          <span className='signup-header'>Login</span>
          <form onSubmit={this.handleSubmit}>
            <div className='form-piece login-form-piece'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                style={{ fontSize: '1em', width: '55%' }}
                name='username'
                placeholder='Your name...'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-piece login-form-piece'>
              <label htmlFor='password'>Password:</label>
              <input
                name='password'
                style={{ fontSize: '1em', width: '55%' }}
                placeholder='******'
                type='password'
                onChange={this.handleChange}
              />
            </div>
            <div className='login-button'>
              <button className=''>Submit</button>
            </div>
          </form>
          <b className='signup-message'>{this.state.message}</b>
        </div>
        <div className='switch-button'>
          {/* <button className=''>Click to Create an Account</button> */}
        </div>
      </div>
    );
  }
}
