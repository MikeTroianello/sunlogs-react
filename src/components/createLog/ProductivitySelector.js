import React from 'react';

const ProductivitySelector = ({ productivity, onClick }) => {
  return (
    <div className='create-productivity-box'>
      <label htmlFor='productivity'>
        How productive do you think you were today?{' '}
        <span className='one-through-five-box'>
          <b>{productivity}</b>
        </span>
      </label>
      <br />
      <div className='one-through-five' onClick={onClick}>
        <span id='productivity'>1</span>
        <span id='productivity'>2</span>
        <span id='productivity'>3</span>
        <span id='productivity'>4</span>
        <span id='productivity'>5</span>
      </div>
    </div>
  );
};

export default ProductivitySelector;
