import React from 'react';

const HideName = ({ hideCreatorDefault, onClick }) => {
  return (
    <div>
      <h3>Hide your name by Default</h3>
      <h4 className={hideCreatorDefault ? 'red' : 'green'}>
        Your name is {hideCreatorDefault ? 'HIDDEN' : 'shown'} by default
      </h4>
      <button
        className='settings-change-preferences-button'
        name='hideCreatorDefault'
        onClick={onClick}
      >
        {hideCreatorDefault ? 'Show' : 'Hide'} by Default
      </button>
    </div>
  );
};

export default HideName;
