import React from 'react';
import BaseInput from './BaseInput';

const EmailInput = ({ onChange }) => {
  return (
    <BaseInput
      label='Email: (optional)'
      name='email'
      type='email'
      autoComplete='off'
      placeholder='Your email...'
      onChange={onChange}
    />
  );
};

export default EmailInput;
