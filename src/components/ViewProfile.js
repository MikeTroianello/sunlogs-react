import React, { Component } from 'react';
import AuthService from "../auth/auth-service";
import WeatherAudit from './weather/WeatherAudit';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faGenderless as nonbinary,
  faVenus as female,
  faMars as male
} from '@fortawesome/free-solid-svg-icons';

class ViewProfile extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    name: null,
    oldestFirst: false
  };

  service = new AuthService(this.props.user.token);

  componentDidMount() {
    this.service
      .seeUser(this.props.match.params.id)
      .then(results => {
        this.makeTheLogs(results);
      })
      .catch(err => {
        console.log(err);
      });
  }

  makeTheLogs = results => {
    if (results.length < 1) {
      this.setState({
        logs: <div>They haven't created any logs...</div>
      });
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let moodArr = [];
      let name;
      let genderIcon;

      let theLogs = results.map((log, key) => {
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

        let weatherString;
        if (!name) name = log.creatorId.username;
        moodArr.push(log.mood);
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
                  {log.county}, {log.state}
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
          </div>
        );
      });
      let mood =
        Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

      this.setState({
        rawLogs: results,
        logs: theLogs,
        mood: mood,
        name: name,
        gender: genderIcon
      });
    }
  };

  sortByAge = () => {
    let sortedLogs;
    if (this.state.oldestFirst) {
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.year > b.year ? 1 : -1
      );
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.dayOfYear > b.dayOfYear ? 1 : -1
      );
    } else {
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.year < b.year ? 1 : -1
      );
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.dayOfYear < b.dayOfYear ? 1 : -1
      );
    }
    this.setState(
      prevState => ({
        oldestFirst: !prevState.oldestFirst
      }),
      this.makeTheLogs(sortedLogs)
    );
  };

  render() {
    return (
      <div className='top-push'>
        <h1>This is {this.state.name}'s page</h1>
        <div className='profile-mood-box'>
          <h2 className='view-profile-overall-happiness'>
            {this.state.name}'s Overall Happiness: {this.state.mood}
          </h2>
          <FontAwesomeIcon icon={this.state.gender} size='3x' />
          {this.state.logs && <WeatherAudit logs={this.state.rawLogs} />}
        </div>
        {/* <button className='sort-by-age' onClick={this.sortByAge}>
          Show {this.state.oldestFirst ? 'oldest' : 'newest'} first
        </button> */}
        <div className='sort-by-age-box'>
          <button className='sort-by-age' onClick={this.sortByAge}>
            Show {this.state.oldestFirst ? 'oldest' : 'newest'} first
          </button>
        </div>
        <br></br>
        <div className='log-box'>{this.state.logs}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(ViewProfile)