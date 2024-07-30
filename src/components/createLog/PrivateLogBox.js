import React from 'react';

const PrivateLogBox = ({ checked, onChange }) => {
  return (
    <div>
      <label htmlFor='privateJournal'>Make this a private Log:</label>
      <input
        type='checkbox'
        name='privateJournal'
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default PrivateLogBox;
