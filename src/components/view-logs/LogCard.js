import React from 'react';
import { connect } from 'react-redux';

const LogCard = ({ log, props }) => {
  if (!log) {
    return null;
  }

  let { profileSelf } = props || {};

  const {
    county,
    state,
    date,
    weatherType,
    mood,
    productivity,
    journal,
    privateJournal,
    hideCreator,
    weatherIcon,
    _id: id,
  } = log || {};

  const logDate = new Date(date);

  let weatherString = weatherIcon
    ? `http://openweathermap.org/img/wn/${weatherIcon.slice(0, -1)}d@2x.png`
    : '';

  return (
    <div key={id} className='log'>
      <div className='profile-log-head'>
        <div>
          <span className='profile-date'>
            <span>{logDate.toDateString()}</span>
          </span>
          <h2>
            {county} County, {state}
          </h2>
        </div>
        <div className='weather-box weather-box-profile'>
          <span>
            <img
              className='weather-icon'
              src={weatherString}
              alt={weatherType}
            />
          </span>
          <p> {weatherType}</p>
        </div>
      </div>

      <div className='mood-and-productivity'>
        <h3>
          Mood: <p>{mood}</p>
        </h3>
        <h3>
          Productivity: <p>{productivity}</p>
        </h3>
      </div>
      <h3>Log: {journal}</h3>
      {profileSelf && hideCreator && (
        <i>You have hidden your name for this log</i>
      )}
      <br />
      {profileSelf && privateJournal && (
        <i>You have hidden this journal from public viewing</i>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userRedux: state.user,
});

export default connect(mapStateToProps)(LogCard);
