import React from 'react';
import BaseInput from './BaseInput';

const PasswordInput = ({ onChange }) => {
  return (
    <BaseInput
      label='Password'
      type='password'
      name='password'
      placeholder='Your password...'
      autoComplete='off'
      onChange={onChange}
    />
  );
};

export default PasswordInput;
