import React from 'react';

const MakeJournalsPrivate = ({ onClick, privateJournalDefault }) => {
  return (
    <div>
      <h3>Make Journals Private by Default</h3>
      <h4 className={privateJournalDefault ? 'red' : 'green'}>
        Your Journals are {privateJournalDefault ? 'HIDDEN' : 'shown'} by
        default
      </h4>
      <button
        className='settings-change-preferences-button'
        name='privateJournalDefault'
        onClick={onClick}
      >
        {privateJournalDefault ? 'Show' : 'Hide'} by Default
      </button>
    </div>
  );
};

export default MakeJournalsPrivate;
