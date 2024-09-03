import React from 'react';

const GenderSelector = ({ onChange }) => {
  return (
    <div className='form-piece'>
      <label htmlFor='gender'>What is your gender?</label>
      <select name='gender' onChange={onChange}>
        <option selected disabled>
          Choose:
        </option>
        <option value='male'>Male</option>
        <option value='female'>Female</option>
        <option value='nonbinary'>Non-binary</option>
      </select>
    </div>
  );
};

export default GenderSelector;
