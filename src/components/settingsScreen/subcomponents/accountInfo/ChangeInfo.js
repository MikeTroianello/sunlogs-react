import React from 'react';

const ChangeInfo = ({
  autoComplete = 'off',
  currentInfo,
  label,
  name,
  onChange,
  pattern,
  placeholder,
  title,
  type,
}) => {
  return (
    <div>
      {title && (
        <h3>
          {title}: {currentInfo}
        </h3>
      )}
      <div className='change-account-sub-box'>
        <span>{label}</span>
        <input
          type={type}
          autoComplete={autoComplete}
          pattern={pattern}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ChangeInfo;
