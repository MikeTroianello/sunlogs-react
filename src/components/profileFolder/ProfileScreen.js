import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGenderless as nonbinary,
  faVenus as female,
  faMars as male,
} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../auth/auth-service';
import WeatherAudit from '../weather/WeatherAudit';
import { profile, seeUser } from '../../auth/authService';

const defaultState = {
  user: null,
  rawLogs: null,
  logs: null,
  moodAvg: [],
  mood: null,
  notToday: false,
  block: false,
  oldestFirst: false,
  profileHeader: '',
  happinessHeader: '',
};

const ProfileScreen = ({ props }) => {
  const [state, setState] = useState(defaultState);
  console.log('!state', state);
  // const service = new AuthService(props.userRedux.token);

  // useEffect(()=>{
  //   setItAllUp()
  // },[setItAllUp])

  //WHAT IS THIS DOING??

  // componentDidUpdate(prevProps) {
  //   if (props.profileSelf != prevProps.profileSelf) {
  //     thiss.setItAllUp();
  //   }
  // }

  // useEffect(()=>{
  //   if (props.profileSelf != prevProps.profileSelf) {
  //     setItAllUp();
  //   }
  // },[])

  const makeTheLogs = (results, profileSelf) => {
    let today = new Date();
    var start = new Date(today.getFullYear(), 0, 0);
    var diff =
      today -
      start +
      (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    let a = today.toString().split(' ');
    var day = Math.floor(diff / oneDay);
    let year = a[3];

    if (results.length < 1 && profileSelf) {
      setState({
        logs: (
          <div className='no-log-created'>
            You haven't created a log yet! <br />
            <Link to='/create'>Make one now!</Link>
          </div>
        ),
        block: true,
      });
    } else if (results.length < 1) {
      setState({
        logs: <div>They haven't created any logs...</div>,
      });
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let moodArr = [];

      let name;
      let genderIcon;

      let theLogs = results.map((log, key) => {
        if (!profileSelf) {
          if (!name) name = log.creatorId.username;
          switch (log.creatorId.gender) {
            case 'male':
              genderIcon = male;
              break;
            case 'female':
              genderIcon = female;
              break;
            default:
              genderIcon = nonbinary;
              break;
          }
        }
        moodArr.push(log.mood);
        let weatherString;
        if (log.weatherIcon) {
          weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
            0,
            -1
          )}d@2x.png`;
        } else weatherString = '';
        return (
          <div key={key} className='log'>
            <div className='profile-log-head'>
              <div>
                <span className='profile-date'>
                  <span>{log.month}</span> <span>{log.dayOfMonth}</span>
                  {', '}
                  <span>{log.year}</span>
                </span>
                <h2>
                  {log.county} County, {log.state}
                </h2>
              </div>
              <div className='weather-box weather-box-profile'>
                <span>
                  <img
                    className='weather-icon'
                    src={weatherString}
                    alt={log.weatherType}
                  />
                </span>
                <p> {log.weatherType}</p>
              </div>
            </div>

            <div className='mood-and-productivity'>
              <h3>
                Mood: <p>{log.mood}</p>
              </h3>
              <h3>
                Productivity: <p>{log.productivity}</p>
              </h3>
            </div>
            <h3>Log: {log.journal}</h3>
            {profileSelf && log.hideCreator && (
              <i>You have hidden your name for this log</i>
            )}
            <br />
            {profileSelf && log.privateJournal && (
              <i>You have hidden this journal from public viewing</i>
            )}
          </div>
        );
      });
      let mood =
        Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

      if (profileSelf) {
        setState({
          rawLogs: results,
          logs: theLogs,
          mood: mood,
          profileHeader: 'Your Profile Page',
          happinessHeader: 'Overall Happiness: ',
          profileSelf: true,
        });
        let dailyLog = results.filter((log) => {
          return log.dayOfYear === day && log.year === Number(year);
        });
        if (dailyLog.length < 1) {
          setState({
            notToday: true,
          });
        }
      } else {
        setState({
          rawLogs: results,
          logs: theLogs,
          mood: mood,
          name: name,
          gender: genderIcon,
          profileHeader: `this is ${name}'s page`,
          happinessHeader: `${name}'s Overall Happiness: `,
          profileSelf: false,
        });
      }
    }
  };

  const setItAllUp = async () => {
    let { profileSelf } = props;
    let results;

    profileSelf
      ? (results = await profile(props.userRedux.token))
      : (results = await seeUser(props.match.params.id));

    makeTheLogs(results, profileSelf);
  };

  const sortByAge = () => {
    let sortedLogs;
    if (state.oldestFirst) {
      sortedLogs = state.rawLogs.sort((a, b) => (a.year > b.year ? 1 : -1));
      sortedLogs = state.rawLogs.sort((a, b) =>
        a.dayOfYear > b.dayOfYear ? 1 : -1
      );
    } else {
      sortedLogs = state.rawLogs.sort((a, b) => (a.year < b.year ? 1 : -1));
      sortedLogs = state.rawLogs.sort((a, b) =>
        a.dayOfYear < b.dayOfYear ? 1 : -1
      );
    }
    setState(
      (prevState) => ({
        oldestFirst: !prevState.oldestFirst,
      }),
      makeTheLogs(sortedLogs, state.profileSelf)
    );
  };

  let { profileSelf } = props;

  return (
    <div className='top-push'>
      <h1>{state.profileHeader}</h1>
      {state.notToday && (
        <h1>
          <b>
            You have not created a mood log today!{' '}
            <Link to='/create'>Create one now!</Link>
          </b>
        </h1>
      )}
      <div className='profile-mood-box'>
        <h2 className='view-profile-overall-happiness'>
          {state.happinessHeader}
          {state.mood}
        </h2>
        {!profileSelf && <FontAwesomeIcon icon={state.gender} size='3x' />}
        {state.logs && !state.block && <WeatherAudit logs={state.rawLogs} />}
      </div>
      <div className='sort-by-age-box'>
        <button className='sort-by-age' onClick={sortByAge}>
          Show {state.oldestFirst ? 'oldest' : 'newest'} first
        </button>
      </div>
      <br></br>
      <div className='log-box'>{state.logs}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userRedux: state.user,
});

export default connect(mapStateToProps)(ProfileScreen);
