import React from 'react';

const BaseInput = ({
  label,
  onchange,
  name,
  maxLength,
  placeholder,
  autoComplete = 'off',
  type = 'text',
}) => {
  return (
    <div className='form-piece'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onchange}
      />
    </div>
  );
};

export default BaseInput;
