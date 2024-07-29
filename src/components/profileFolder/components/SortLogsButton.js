import React from 'react';

const SortLogsButton = ({ logs = [], onClick, oldestFirst }) => {
  if (!logs || !logs.length) {
    return null;
  }

  const orderLabel = oldestFirst ? 'oldest' : 'newest';

  return (
    <div className='sort-by-age-box'>
      <button className='sort-by-age' onClick={onClick}>
        Show {orderLabel} first
      </button>
    </div>
  );
};

export default SortLogsButton;
