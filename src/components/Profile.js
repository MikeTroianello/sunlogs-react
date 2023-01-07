import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../auth/auth-service";
import { Link } from "react-router-dom";
import WeatherAudit from "./weather/WeatherAudit";
import { profile } from "../auth/authService";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faCog as cog } from '@fortawesome/free-solid-svg-icons';

class Profile extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    notToday: false,
    block: false,
    oldestFirst: false,
  };

  service = new AuthService(this.props.user.token);

  componentDidMount() {
    // this.service = new AuthService(this.props.user.token);
    profile()
      .then((results) => {
        this.makeTheLogs(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  makeTheLogs = (results) => {
    let today = new Date();
    var start = new Date(today.getFullYear(), 0, 0);
    var diff =
      today -
      start +
      (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    let a = today.toString().split(" ");
    var day = Math.floor(diff / oneDay);
    let year = a[3];

    if (results.length < 1) {
      this.setState({
        logs: (
          <div className="no-log-created">
            You haven't created a log yet! <br />
            <Link to="/create">Make one now!</Link>
          </div>
        ),
        block: true,
      });
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let moodArr = [];
      let theLogs = results.map((log, key) => {
        moodArr.push(log.mood);
        let weatherString;
        if (log.weatherIcon) {
          weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
            0,
            -1
          )}d@2x.png`;
        } else weatherString = "";
        return (
          <div key={key} className="log">
            <div className="profile-log-head">
              <div>
                <span className="profile-date">
                  <span>{log.month}</span> <span>{log.dayOfMonth}</span>
                  {", "}
                  <span>{log.year}</span>
                </span>
                <h2>
                  {log.county} County, {log.state}
                </h2>
              </div>
              <div className="weather-box weather-box-profile">
                <span>
                  <img
                    className="weather-icon"
                    src={weatherString}
                    alt={log.weatherType}
                  />
                </span>
                <p> {log.weatherType}</p>
              </div>
            </div>

            <div className="mood-and-productivity">
              <h3>
                Mood: <p>{log.mood}</p>
              </h3>
              <h3>
                Productivity: <p>{log.productivity}</p>
              </h3>
            </div>
            <h3>Log: {log.journal}</h3>
            {log.hideCreator && <i>You have hidden your name for this log</i>}
            <br />
            {log.privateJournal && (
              <i>You have hidden this journal from public viewing</i>
            )}
          </div>
        );
      });
      let mood =
        Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

      this.setState({
        rawLogs: results,
        logs: theLogs,
        mood: mood,
      });
      let dailyLog = results.filter((log) => {
        return log.dayOfYear === day && log.year === Number(year);
      });
      if (dailyLog.length < 1) {
        this.setState({
          notToday: true,
        });
      }
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
      (prevState) => ({
        oldestFirst: !prevState.oldestFirst,
      }),
      this.makeTheLogs(sortedLogs)
    );
  };

  render() {
    return (
      <div className="top-push">
        <h1>Your Profile Page</h1>
        {this.state.notToday && (
          <h1>
            <b>
              You have not created a mood log today!{" "}
              <Link to="/create">Create one now!</Link>
            </b>
          </h1>
        )}
        <div className="profile-mood-box">
          <h2>Overall Happiness: {this.state.mood}</h2>
          {this.state.logs && !this.state.block && (
            <WeatherAudit logs={this.state.rawLogs} />
          )}
        </div>
        <div className="sort-by-age-box">
          {this.state.rawLogs && (
            <button className="sort-by-age" onClick={this.sortByAge}>
              Show {this.state.oldestFirst ? "oldest" : "newest"} first
            </button>
          )}
        </div>
        <br></br>
        <div className="log-box">{this.state.logs}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
