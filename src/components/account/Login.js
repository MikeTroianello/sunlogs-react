import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setToken } from '../../redux/actionCreators/userActionCreator';
import { login } from '../../auth/authService';
import { getDay, getYear } from '../../utils/formatDays';

const Login = (props) => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('qwe');
  const [password, setPassword] = useState('qwe');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username) {
        setMessage('You must include a username');
      } else if (!password) {
        setMessage('You must include a password');
      } else {
        const day = getDay();
        const year = getYear();
        let results = await login(username, password, day, year);

        setUsername('');
        setPassword('');

        if (!results.message) {
          // await this.props.setToken(results.token);
          localStorage.setItem('token', results.token);
          props.logIt(results.user);
        }
      }
    } catch (error) {
      setMessage('Incorrect Username or Password');
    }
  };

  return (
    <div>
      <div className='signup'>
        <span className='signup-header'>Login</span>
        <form onSubmit={handleSubmit}>
          <div className='form-piece login-form-piece'>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              style={{ fontSize: '1em', width: '55%' }}
              name='username'
              placeholder='Your name...'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className='form-piece login-form-piece'>
            <label htmlFor='password'>Password:</label>
            <input
              name='password'
              style={{ fontSize: '1em', width: '55%' }}
              placeholder='******'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className='login-button'>
            <button className=''>Submit</button>
          </div>
        </form>
        <b className='signup-message'>{message}</b>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setToken: (token) => setToken(token),
};

export default connect(null, mapDispatchToProps)(Login);
