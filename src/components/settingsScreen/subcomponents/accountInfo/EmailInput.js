import React from 'react';
import ChangeInfo from './ChangeInfo';

const EmailInput = ({
  currentEmail,
  onChange,
  autoComplete = 'off',
  label = 'Change email',
  name = 'email',
  placeholder = 'name@email.com',
  title = 'our old email',
  type = 'email',
}) => {
  return (
    <ChangeInfo
      autoComplete={autoComplete}
      currentInfo={currentEmail}
      label={label}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      title={title}
      type={type}
    />
  );
};

export default EmailInput;
