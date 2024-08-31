import React from 'react';
import ChangeInfo from './ChangeInfo';

const ChangePassword = ({ onChange }) => {
  return (
    <div className='settings-change-password'>
      <h3>Change Password</h3>
      <div className='change-password-super-box'>
        <div className='change-password-box'>
          <div className='change-password-sub-box'>
            <ChangeInfo
              autoComplete='off'
              label='New Password'
              name='oldPass'
              onChange={onChange}
              placeholder='********'
              type='email'
            />
            <br />
            <ChangeInfo
              autoComplete='off'
              label='Old Password'
              name='newPass'
              onChange={onChange}
              placeholder='********'
              type='email'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
