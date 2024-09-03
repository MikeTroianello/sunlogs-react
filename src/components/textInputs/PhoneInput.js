import React from 'react';
import BaseInput from './BaseInput';

const PhoneInput = ({ onChange }) => {
  return (
    <BaseInput
      label='Phone: (optional)'
      name='phone'
      autoComplete='off'
      type='tel'
      pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
      placeholder='867-5309'
      onChange={onChange}
    />
  );
};

export default PhoneInput;
