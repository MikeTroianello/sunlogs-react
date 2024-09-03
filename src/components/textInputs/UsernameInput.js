import React from 'react';
import BaseInput from './BaseInput';

const UsernameInput = ({ onChange }) => {
  return (
    <BaseInput
      label='Your Username'
      name='username'
      maxLength='20'
      placeholder='Your name...'
      autoComplete='off'
      onChange={onChange}
    />
  );
};

export default UsernameInput;
