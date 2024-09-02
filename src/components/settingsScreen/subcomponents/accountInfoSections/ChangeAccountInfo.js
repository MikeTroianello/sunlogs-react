import React from 'react';
import PhoneInput from '../changeAccountInfo/PhoneInput';
import EmailInput from '../changeAccountInfo/EmailInput';
import ChangePassword from '../changeAccountInfo/ChangePassword';

const ChangeAccountInfo = ({
  currentPhone,
  currentEmail,
  onChange,
  onClick,
}) => {
  return (
    <div className='settings-change-info'>
      <h1>Change your Account Info</h1>
      <PhoneInput currentPhone={currentPhone} onChange={onChange} />
      <EmailInput currentEmail={currentEmail} onChange={{ onChange }} />
      <button className='settings-change-button' onClick={onClick}>
        Change Info
      </button>
      <ChangePassword onChange={onChange} />
      <br />
      <button className='settings-change-button' onClick={onClick}>
        Change Password
      </button>
    </div>
  );
};

export default ChangeAccountInfo;
