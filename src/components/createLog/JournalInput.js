import React from 'react';

const JournalInput = ({ onChange }) => {
  return (
    <div>
      <label htmlFor='journal'>
        What were some of your thoughts about today?
      </label>
      <textarea
        type='textbox'
        name='journal'
        id='journal'
        rows='6'
        cols='48'
        autoComplete='off'
        maxLength='250'
        placeholder='max length 250 characters'
        onChange={onChange}
      />
    </div>
  );
};

export default JournalInput;
