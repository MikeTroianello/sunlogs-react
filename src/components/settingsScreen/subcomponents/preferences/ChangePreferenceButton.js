import React from 'react';

const ChangePreferenceButton = ({ onClick }) => {
  return (
    <button className='settings-change-button' onClick={onClick}>
      Change Preferences
    </button>
  );
};

export default ChangePreferenceButton;
