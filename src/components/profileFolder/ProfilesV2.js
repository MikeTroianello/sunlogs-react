import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  faGenderless as nonbinary,
  faVenus as female,
  faMars as male,
} from '@fortawesome/free-solid-svg-icons';
import { profile, seeUser } from '../../auth/authService';
import CreateLogButton from './components/CreateLogButton';
import MoodBox from './components/MoodBox';
import SortLogsButton from './components/SortLogsButton';
import LogCard from '../view-logs/LogCard';

const ProfilesV2 = (props) => {
  const [state, setState] = useState({
    user: null,
    rawLogs: [],
    moodAvg: [],
    logs: [],
    mood: null,
    notToday: false,
    block: false,
    oldestFirst: false,
    profileHeader: '',
    happinessHeader: '',
  });

  const makeTheLogs = (results, profileSelf) => {
    if (!results?.length && profileSelf) {
      setState({
        profileHeader: 'Your Profile Page',
        rawLogs: [],
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

      let theLogs = results.map((log) => {
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
        return log;
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

        const today = new Date().setHours(0, 0, 0, 0);

        let isTodaysLogCreated = results.find(({ date }) => {
          const creationDate = new Date(date).setHours(0, 0, 0, 0);
          return today === creationDate;
        });
        if (!isTodaysLogCreated) {
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

    const results = profileSelf
      ? await profile(props.userRedux.token)
      : await seeUser(props.match.params.id);

    makeTheLogs(results, profileSelf);
  };

  useEffect(() => {
    setItAllUp();
  }, []);

  //What to do with this?

  // componentDidUpdate(prevProps) {
  //   if (props.profileSelf !== prevProps.profileSelf) {
  //     setItAllUp();
  //   }
  // }

  const sortByAge = () => {
    let sortedLogs = state.rawLogs.sort((a, b) => {
      return a.date - b.date;
    });

    console.log('!sortedLogs', sortedLogs);

    if (state.oldestFirst) {
      sortedLogs = sortedLogs.reverse();
    }

    setState({
      oldestFirst: !state.oldestFirst,
    });
    makeTheLogs(sortedLogs, state.profileSelf);
  };

  let { profileSelf } = props;

  const noLogs = !state.logs?.length && profileSelf;

  return (
    <div className='top-push'>
      <h1>{state.profileHeader}</h1>
      {state.notToday && <CreateLogButton />}
      <MoodBox state={state} profileSelf={profileSelf} />
      <SortLogsButton
        onClick={sortByAge}
        logs={state?.logs}
        oldestFirst={state?.oldestFirst}
      />
      <br></br>
      {noLogs && (
        <div className='no-log-created'>
          You haven't created a log yet! <br />
          <Link to='/create'>Make one now!</Link>
        </div>
      )}
      <div className='log-box'>
        {state.rawLogs?.map((log) => {
          const { id } = log || {};
          const key = id || log.toString();
          return <LogCard log={log} key={key} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userRedux: state.user,
});

export default connect(mapStateToProps)(ProfilesV2);
