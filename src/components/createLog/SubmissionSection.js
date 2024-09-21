import React from 'react';

const SubmissionSection = ({ errorMessage, handleSubmit, message }) => {
  return (
    <div>
      <button className='create-log-button' onClick={handleSubmit}>
        Log It
      </button>
      <br></br>
      {errorMessage && <b className='red'>{errorMessage}</b>}
      {message && <b className='black'>{message}</b>}
    </div>
  );
};

export default SubmissionSection;
