import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WeatherAudit from '../../weather/WeatherAudit';

const MoodBox = ({ profileSelf, state }) => {
  const { block, gender, happinessHeader, logs, mood, rawLogs } = state || {};
  return (
    <div className='profile-mood-box'>
      <h2 className='view-profile-overall-happiness'>
        {happinessHeader}
        {mood}
      </h2>
      {!profileSelf && <FontAwesomeIcon icon={gender} size='3x' />}
      {logs && !block && <WeatherAudit logs={rawLogs} />}
    </div>
  );
};

export default MoodBox;
