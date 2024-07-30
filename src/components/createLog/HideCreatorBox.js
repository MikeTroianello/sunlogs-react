import React from 'react';

const HideCreatorBox = ({ checked, onChange }) => {
  return (
    <div>
      <label htmlFor='hideCreator'>Hide your status as creator*:</label>
      <input
        type='checkbox'
        name='hideCreator'
        checked={checked}
        onChange={onChange}
      />
      <p>
        (*Note: people will still see the contents of this log, they just will
        be unable to know you created it)
      </p>
    </div>
  );
};

export default HideCreatorBox;
