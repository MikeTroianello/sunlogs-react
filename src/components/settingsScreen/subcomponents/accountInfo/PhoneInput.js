import React from 'react';
import ChangeInfo from './ChangeInfo';

const PhoneInput = ({
  currentPhone,
  onChange,
  autoComplete = 'off',
  label = 'Change Phone #',
  name = 'phone',
  pattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}',
  placeholder = '+3(141)592-6535',
  title = 'Your old phone number',
  type = 'tel',
}) => {
  return (
    <ChangeInfo
      autoComplete={autoComplete}
      currentInfo={currentPhone}
      label={label}
      name={name}
      onChange={onChange}
      pattern={pattern}
      placeholder={placeholder}
      title={title}
      type={type}
    />
  );
};

export default PhoneInput;
