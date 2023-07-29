import React, { Component } from 'react';
import AuthService from '../../auth/auth-service';
import { connect } from 'react-redux';
import { setToken } from '../../redux/actionCreators/userActionCreator';
import { signup } from '../../auth/authService';

class Signup extends Component {
  state = {
    message: null,
    user: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
  };

  service = new AuthService();

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password, gender } = this.state;
      if (!username) {
        this.setState({
          message: `You must include a username`,
        });
      } else if (!password) {
        this.setState({
          message: `You must include a password`,
        });
      } else if (!gender) {
        this.setState({
          message: `You must include a gender`,
        });
      } else {
        const state = this.state;
        let results = await signup(state);

        localStorage.setItem('token', results.token);
        // await this.props.setToken(results.token);
        this.props.logIt(results.user);
      }
    } catch (error) {
      this.setState({
        message: `Username already exists!`,
      });
    }
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { username, password, gender } = this.state;
  //   if (!username) {
  //     this.setState({
  //       message: `You must include a username`
  //     });
  //   } else if (!password) {
  //     this.setState({
  //       message: `You must include a password`
  //     });
  //   } else if (!gender) {
  //     this.setState({
  //       message: `You must include a gender`
  //     });
  //   } else {
  //     const state = this.state;
  //     this.service
  //       .signup(state)
  //       .then(results => {
  //         this.props.logIt(results);
  //       })
  //       .catch(error => {
  //         this.setState({
  //           message: `Username already exists!`
  //         });
  //       });
  //   }
  // };

  render() {
    return (
      <div>
        <div className='signup'>
          <span className='signup-header'>Create an Account!</span>
          <form className='signup-form' onSubmit={this.handleSubmit}>
            <div className='form-pieces'>
              <div className='form-piece'>
                <label htmlFor='name'>Your Username:</label>
                <input
                  name='username'
                  maxLength='20'
                  placeholder='Your name...'
                  autoComplete='off'
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-piece'>
                <label htmlFor='password'>Password:</label>
                <input
                  name='password'
                  type='password'
                  placeholder='Your password...'
                  autoComplete='off'
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-piece'>
                <label htmlFor='email'>Email: (optional)</label>
                <input
                  name='email'
                  type='email'
                  autoComplete='off'
                  placeholder='Your email...'
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-piece'>
                <label htmlFor='phone'>Phone: (optional)</label>
                <input
                  name='phone'
                  autoComplete='off'
                  type='tel'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  placeholder='867-5309'
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-piece'>
                <label htmlFor='gender'>What is your gender?</label>
                <select name='gender' onChange={this.handleChange}>
                  <option selected disabled>
                    Choose:
                  </option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='nonbinary'>Non-binary</option>
                </select>
              </div>
            </div>
            <div className='signup-button'>
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

const mapDispatchToProps = {
  setToken,
};

export default connect(null, mapDispatchToProps)(Signup);
