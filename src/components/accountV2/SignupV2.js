import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setToken } from '../../redux/actionCreators/userActionCreator';
import { signup } from '../../auth/authService';
import UsernameInput from '../textInputs/UsernameInput';
import PasswordInput from '../textInputs/PasswordInput';
import EmailInput from '../textInputs/EmailInput';
import PhoneInput from '../textInputs/PhoneInput';
import GenderSelector from '../selectors/GenderSelector';

const Signup = (props) => {
  const [state, setState] = useState({
    message: null,
    user: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password, gender } = state;
      if (!username) {
        setState({
          message: `You must include a username`,
        });
      } else if (!password) {
        setState({
          message: `You must include a password`,
        });
      } else if (!gender) {
        setState({
          message: `You must include a gender`,
        });
      } else {
        let results = await signup(state);

        localStorage.setItem('token', results.token);
        props.logIt(results.user);
      }
    } catch (error) {
      setState({
        message: `Username already exists!`,
      });
    }
  };

  return (
    <div>
      <div className='signup'>
        <span className='signup-header'>Create an Account!</span>
        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='form-pieces'>
            <UsernameInput onChange={handleChange} />
            <PasswordInput onChange={handleChange} />
            <EmailInput onChange={handleChange} />
            <PhoneInput onChange={handleChange} />
            <GenderSelector onChange={handleChange} />
          </div>
          <div className='signup-button'>
            <button className=''>Submit</button>
          </div>
        </form>
        <b className='signup-message'>{state.message}</b>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setToken,
};

export default connect(null, mapDispatchToProps)(Signup);
