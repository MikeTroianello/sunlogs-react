import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  faGenderless as nonbinary,
  faVenus as female,
  faMars as male,
} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../auth/auth-service';
import { profile, seeUser } from '../../auth/authService';
import CreateLogButton from './components/CreateLogButton';
import MoodBox from './components/MoodBox';
import SortLogsButton from './components/SortLogsButton';
import LogCard from '../view-logs/LogCard';

class AllProfiles extends Component {
  state = {
    user: null,
    rawLogs: null,
    moodAvg: [],
    mood: null,
    notToday: false,
    block: false,
    oldestFirst: false,
    profileHeader: '',
    happinessHeader: '',
  };

  service = new AuthService();

  componentDidMount = () => {
    this.setItAllUp();
  };

  setItAllUp = async () => {
    let { profileSelf } = this.props;
    this.service = new AuthService(this.props.userRedux.token);

    const results = profileSelf
      ? await profile(this.props.userRedux.token)
      : await seeUser(this.props.match.params.id);

    this.makeTheLogs(results, profileSelf);
  };

  componentDidUpdate(prevProps) {
    if (this.props.profileSelf != prevProps.profileSelf) {
      this.setItAllUp();
    }
  }

  makeTheLogs = (results, profileSelf) => {
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
      this.setState({
        logs: (
          <div className='no-log-created'>
            You haven't created a log yet! <br />
            <Link to='/create'>Make one now!</Link>
          </div>
        ),
        block: true,
      });
    } else if (results.length < 1) {
      this.setState({
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
      });
      let mood =
        Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

      if (profileSelf) {
        this.setState({
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
          this.setState({
            notToday: true,
          });
        }
      } else {
        this.setState({
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

  sortByAge = () => {
    let sortedLogs = this.state.rawLogs.sort((a, b) => {
      if (a.year === b.year) {
        return b.dayOfYear - a.dayOfYear;
      } else {
        return b.year - a.year;
      }
    });

    if (this.state.oldestFirst) {
      sortedLogs = sortedLogs.reverse();
    }

    this.setState(
      (prevState) => ({
        oldestFirst: !prevState.oldestFirst,
      }),
      this.makeTheLogs(sortedLogs, this.state.profileSelf)
    );
  };
  render() {
    let { profileSelf } = this.props;

    return (
      <div className='top-push'>
        <h1>{this.state.profileHeader}</h1>
        {this.state.notToday && <CreateLogButton />}
        <MoodBox state={this.state} profileSelf={profileSelf} />
        <SortLogsButton
          onClick={this.sortByAge}
          logs={this.state?.logs}
          oldestFirst={this.state?.oldestFirst}
        />
        <br></br>
        <div className='log-box'>
          {this.state.rawLogs &&
            this.state.rawLogs?.map((log) => {
              return <LogCard log={log} />;
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userRedux: state.user,
});

export default connect(mapStateToProps)(AllProfiles);
