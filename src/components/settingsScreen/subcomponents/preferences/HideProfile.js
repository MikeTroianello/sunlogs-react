import React from 'react';

const HideProfile = ({ hideProfile, onClick }) => {
  return (
    <div>
      <h3>Hide your profile</h3>
      <p>This makes sure people will not be able to view your profile.</p>
      <p className='settings-aside'>
        (They still can see your name on your logs, if you choose to not hide
        them)
      </p>
      <h3>{hideProfile}</h3>
      <h4 className={hideProfile ? 'red' : 'green'}>
        You currently {hideProfile === true && <span>DO NOT </span>}
        allow others to view your profile
      </h4>
      <button
        className='settings-change-preferences-button'
        name='hideProfile'
        onClick={onClick}
      >
        {hideProfile ? 'Show' : 'Hide'} profile
      </button>
    </div>
  );
};

export default HideProfile;
