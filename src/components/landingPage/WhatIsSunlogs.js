import React from 'react';
import mockLog from '../../testing/mockLog.json';
import Log from '../view-logs/Log';

const WhatIsSunlogs = () => {
  return (
    <div className='homepage-sunlog'>
      <div className='sunlog-description'>
        <h2>What is Sunlogs?</h2>
        <p>
          Sunlogs is a way to record your daily <strong>Mood</strong> and how{' '}
          <strong>Productive</strong> you thought you were.
        </p>
        <p>
          You can also create a journal for any feelings you might want to jot
          down.
        </p>
        <p>
          These logs are then tied to the weather in your county, and will
          compare correlate mood respectively
        </p>
      </div>
      <div className='sunlog-example'>
        <Log log={mockLog} test={true} />
        <h4>(Your logs can be as private as you want them to be)</h4>
      </div>
    </div>
  );
};

export default WhatIsSunlogs;
