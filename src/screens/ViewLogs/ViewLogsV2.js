import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { getDate } from '../../auth/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGenderless as nonbinary,
  faVenus as female,
  faMars as male,
} from '@fortawesome/free-solid-svg-icons';
import { useViewAllLogs } from '../../hooks/useViewAllLogs';

import StateFilter from '../../components/fiterByLocation/StateFilter';
import CountyFilter from '../../components/fiterByLocation/CountyFilter';
import WeatherAudit from '../../components/weather/WeatherAudit';

const ViewLogsV2 = (props) => {
  const [state, setState] = useState({
    today: new Date(),
    date: new Date(),
    logs: null,
    filteredLogs: null,
    filteredLogsCopy: null,
    genderSearchMessage: null,
    yours: false,
    id: null,
    day: null,
    year: null,
    states: [],
    counties: [],
    state: undefined,
    stateFiltered: false,
    county: undefined,
  });

  useEffect(() => {
    sanitizeDate(state.today);
  }, []);

  const blah = useViewAllLogs();

  console.log('!blah', blah);

  const sanitizeDate = (dateToLookFor, message) => {
    var start = new Date(dateToLookFor.getFullYear(), 0, 0);
    var diff =
      dateToLookFor -
      start +
      (start.getTimezoneOffset() - dateToLookFor.getTimezoneOffset()) *
        60 *
        1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    let a = dateToLookFor.toString().split(' ');
    let year = a[3];

    getDate(year, day)
      .then((results) => {
        const states = results.specificDay.map((log) => {
          return log.state;
        });

        setState({
          logs: results.specificDay,
          filteredLogs: results.specificDay,
          filteredLogsCopy: results.specificDay,
          genderSearchMessage: null,
          yours: results.yours,
          id: results.id,
          states: [...new Set(states)],
          counties: [],
        });
      })
      .catch((error) => console.log(error));
  };

  const filterByState = () => {
    let stateLogs = state.logs.filter((log) => {
      return log.state === state.state;
    });

    let counties = new Set();

    stateLogs.map((log) => {
      return counties.add(log.county);
    });

    setState({
      filteredLogs: stateLogs,
      counties: [...counties],
      genderSearchMessage: null,
    });
  };

  const filterByCounty = () => {
    let countyLogs = state.logs.filter((log) => {
      return log.county === state.county;
    });

    setState({
      filteredLogs: countyLogs,
      genderSearchMessage: null,
    });
  };

  // HERE

  const filterByGender = (e) => {
    let genderLogs = state.filteredLogsCopy.filter((log) => {
      return log.creatorId.gender === e.target.value;
    });
    setState({
      filteredLogs: genderLogs,
      genderSearchMessage: `Showing all ${e.target.value} logs`,
    });
  };

  // const showLogs = () => {
  //   if (state.filteredLogs.length < 1 && state.today === new Date()) {
  //     return (
  //       <div>
  //         No one has created a log today.{' '}
  //         <Link to='/create'>Why not be the first?</Link>
  //       </div>
  //     );
  //   } else if (state.filteredLogs.length < 1) {
  //     return (
  //       <div>
  //         <h2>There were no logs recorded on this day...</h2>
  //       </div>
  //     );
  //   } else {
  //     return state.filteredLogs.map((log, key) => {
  //       let weatherString;
  //       let genderIcon;
  //       //AS OF NOW, THE ICONS WILL ONLY SHOW THE DAYTIME IMAGES, FOR SIMPLICITY. THIS CAN BE CHANGED AT THE WEATHERSTRING VARIABLE
  //       if (log.weatherIcon) {
  //         weatherString = `https://openweathermap.org/img/wn/${log.weatherIcon.slice(
  //           0,
  //           -1
  //         )}d@2x.png`;
  //       } else weatherString = '';
  //       let theTag = (
  //         <Link to={`/view-profile/${log.creatorId._id}`}>
  //           {log.creatorId.username}
  //         </Link>
  //       );
  //       if (
  //         log.creatorId.username ===
  //           'This user has decided to keep their name private' ||
  //         state.id === log.creatorId._id ||
  //         log.creatorId.username === 'Deleted' ||
  //         log.creatorId.hideProfile
  //       ) {
  //         theTag = log.creatorId.username;
  //       }

  //       switch (log.creatorId.gender) {
  //         case 'male':
  //           genderIcon = male;
  //           break;
  //         case 'female':
  //           genderIcon = female;
  //           break;
  //         default:
  //           genderIcon = nonbinary;
  //           break;
  //       }
  //       return (
  //         <div className='log' key={key}>
  //           <div className='log-head '>
  //             <span>
  //               <h3 className='name-and-gender'>
  //                 <div className='name-box'>
  //                   {state.id === log.creatorId._id ? <i>~(You!)~</i> : theTag}
  //                 </div>
  //                 <div className='gender'>
  //                   <FontAwesomeIcon icon={genderIcon} size='2x' />
  //                 </div>
  //                 <div className='weather-box'>
  //                   <span>
  //                     <img
  //                       className='weather-icon'
  //                       src={weatherString}
  //                       alt={log.weatherType}
  //                     />
  //                   </span>
  //                   <p> {log.weatherType}</p>
  //                 </div>
  //               </h3>
  //               {log.creatorId.username !==
  //                 'This user has decided to keep their name private' &&
  //                 log.hideCreator && (
  //                   <i>You have hidden your name for this log</i>
  //                 )}
  //             </span>
  //           </div>

  //           <h2>
  //             {log.county} County, {log.state}
  //           </h2>
  //           <div className='mood-and-productivity'>
  //             <h3>
  //               Mood: <p>{log.mood}</p>
  //             </h3>
  //             <h3>
  //               Productivity: <p>{log.productivity}</p>
  //             </h3>
  //           </div>
  //           <h4>Log: {log.journal}</h4>
  //           {log.journal !== 'This log is set to private' &&
  //             log.privateJournal && <i>You made this log private</i>}
  //         </div>
  //       );
  //     });
  //   }
  // };

  const onChange = (date) => {
    if (date) {
      setState({ date }, sanitizeDate(date, 'NEW DATE'));
    }
  };

  const filterState = (e) => {
    if (e.target.value !== 'Filter by State:') {
      setState(
        {
          [e.target.name]: e.target.value,
        },
        () => {
          filterByState();
        }
      );
    }
  };

  const filterCounty = (e) => {
    if (e.target.value !== 'Filter by County:') {
      setState(
        {
          [e.target.name]: e.target.value,
        },
        () => {
          filterByCounty();
        }
      );
    }
  };

  const weatherAudit = () => {
    return <WeatherAudit logs={state.filteredLogs} />;
  };

  const defaultLogs = () => {
    setState({
      states: [],
      counties: [],
      state: undefined,
      stateFiltered: false,
      county: undefined,
    });
    sanitizeDate(state.today);
  };

  return (
    <div>
      <div className='view-header top-push'>
        <div>
          <h1>THESE ARE TODAYS LOGS:</h1>
          {!props.createdToday && props.loggedInUser && (
            <div className='create-log-link'>
              You haven't created a log today.{' '}
              <Link to='/create'>Make one now!</Link>
            </div>
          )}
        </div>
        {state.filteredLogs && weatherAudit()}
      </div>
      <div className='filter-box'>
        <div className='gender-filter'>
          Filter By Gender:
          <br />
          <button onClick={filterByGender} value='male'>
            male
          </button>
          <button onClick={filterByGender} value='female'>
            female
          </button>
          <button onClick={filterByGender} value='nonbinary'>
            non-binary
          </button>
          <br />
          {state.genderSearchMessage}
        </div>
        <div>
          Search Logs By Day:
          <br />
          <DatePicker onChange={onChange} value={state.date} />
        </div>
        <div>
          Filter By State:
          <br />
          <StateFilter states={state.states} filter={filterState} />
        </div>
        <div>
          Filter By County:
          <br />
          <CountyFilter counties={state.counties} filter={filterCounty} />
        </div>
        <div>
          <button className='view-default-logs' onClick={defaultLogs}>
            Back to Default
          </button>
        </div>
      </div>

      {/* <div className='log-box'>{state.filteredLogs && showLogs()}</div> */}
    </div>
  );
};

export default ViewLogsV2;
