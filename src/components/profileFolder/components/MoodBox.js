import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WeatherAudit from '../../weather/WeatherAudit';

//TODO: Hide Weatheraudit

const MoodBox = ({ gender, name, profileSelf, logs, mood }) => {
  const happinessHeader =
    name && !profileSelf
      ? `${name}'s Overall Happiness: `
      : 'Overall Happiness: ';

  return (
    <div className='profile-mood-box'>
      <h2 className='view-profile-overall-happiness'>
        {happinessHeader}
        {mood}
      </h2>
      {!profileSelf && <FontAwesomeIcon icon={gender} size='3x' />}
      {logs && <WeatherAudit logs={logs} />}
    </div>
  );
};

export default MoodBox;
