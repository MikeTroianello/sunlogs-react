import React, { Component } from "react";
import AuthService from "../auth/auth-service";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import { getDate } from "../auth/authService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGenderless as nonbinary,
  faVenus as female,
  faMars as male,
} from "@fortawesome/free-solid-svg-icons";

import StateFilter from "./fiterByLocation/StateFilter";
import CountyFilter from "./fiterByLocation/CountyFilter";
import WeatherAudit from "./weather/WeatherAudit";

export default class View extends Component {
  state = {
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
  };

  service = new AuthService();

  //NEW WAY
  componentDidMount() {
    this.sanitizeDate(this.state.today);
  }

  sanitizeDate = (dateToLookFor, message) => {
    var start = new Date(dateToLookFor.getFullYear(), 0, 0);
    var diff =
      dateToLookFor -
      start +
      (start.getTimezoneOffset() - dateToLookFor.getTimezoneOffset()) *
        60 *
        1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    let a = dateToLookFor.toString().split(" ");
    let year = a[3];

    getDate(year, day)
      .then((results) => {
        const states = results.specificDay.map((log) => {
          return log.state;
        });

        this.setState({
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

  filterByState = () => {
    let stateLogs = this.state.logs.filter((log) => {
      return log.state === this.state.state;
    });

    let counties = new Set();

    stateLogs.map((log) => {
      return counties.add(log.county);
    });

    this.setState({
      filteredLogs: stateLogs,
      counties: [...counties],
      genderSearchMessage: null,
    });
  };

  filterByCounty = () => {
    let countyLogs = this.state.logs.filter((log) => {
      return log.county === this.state.county;
    });

    this.setState({
      filteredLogs: countyLogs,
      genderSearchMessage: null,
    });
  };

  // HERE

  filterByGender = (e) => {
    let genderLogs = this.state.filteredLogsCopy.filter((log) => {
      return log.creatorId.gender === e.target.value;
    });
    this.setState({
      filteredLogs: genderLogs,
      genderSearchMessage: `Showing all ${e.target.value} logs`,
    });
  };

  showLogs = () => {
    if (this.state.filteredLogs.length < 1 && this.state.today === new Date()) {
      return (
        <div>
          No one has created a log today.{" "}
          <Link to="/create">Why not be the first?</Link>
        </div>
      );
    } else if (this.state.filteredLogs.length < 1) {
      return (
        <div>
          <h2>There were no logs recorded on this day...</h2>
        </div>
      );
    } else {
      return this.state.filteredLogs.map((log, key) => {
        let weatherString;
        let genderIcon;
        //AS OF NOW, THE ICONS WILL ONLY SHOW THE DAYTIME IMAGES, FOR SIMPLICITY. THIS CAN BE CHANGED AT THE WEATHERSTRING VARIABLE
        if (log.weatherIcon) {
          weatherString = `https://openweathermap.org/img/wn/${log.weatherIcon.slice(
            0,
            -1
          )}d@2x.png`;
        } else weatherString = "";
        let theTag = (
          <Link to={`/view-profile/${log.creatorId._id}`}>
            {log.creatorId.username}
          </Link>
        );
        if (
          log.creatorId.username ===
            "This user has decided to keep their name private" ||
          this.state.id === log.creatorId._id ||
          log.creatorId.username === "Deleted" ||
          log.creatorId.hideProfile
        ) {
          theTag = log.creatorId.username;
        }

        switch (log.creatorId.gender) {
          case "male":
            genderIcon = male;
            break;
          case "female":
            genderIcon = female;
            break;
          default:
            genderIcon = nonbinary;
            break;
        }
        return (
          <div className="log" key={key}>
            <div className="log-head ">
              <span>
                <h3 className="name-and-gender">
                  <div className="name-box">
                    {this.state.id === log.creatorId._id ? (
                      <i>~(You!)~</i>
                    ) : (
                      theTag
                    )}
                  </div>
                  <div className="gender">
                    <FontAwesomeIcon icon={genderIcon} size="2x" />
                  </div>
                  <div className="weather-box">
                    <span>
                      <img
                        className="weather-icon"
                        src={weatherString}
                        alt={log.weatherType}
                      />
                    </span>
                    <p> {log.weatherType}</p>
                  </div>
                </h3>
                {log.creatorId.username !==
                  "This user has decided to keep their name private" &&
                  log.hideCreator && (
                    <i>You have hidden your name for this log</i>
                  )}
              </span>
            </div>

            <h2>
              {log.county} County, {log.state}
            </h2>
            <div className="mood-and-productivity">
              <h3>
                Mood: <p>{log.mood}</p>
              </h3>
              <h3>
                Productivity: <p>{log.productivity}</p>
              </h3>
            </div>
            <h4>Log: {log.journal}</h4>
            {log.journal !== "This log is set to private" &&
              log.privateJournal && <i>You made this log private</i>}
          </div>
        );
      });
    }
  };

  onChange = (date) => {
    if (date) {
      this.setState({ date }, this.sanitizeDate(date, "NEW DATE"));
    }
  };

  filterState = (e) => {
    if (e.target.value !== "Filter by State:") {
      this.setState(
        {
          [e.target.name]: e.target.value,
        },
        () => {
          this.filterByState();
        }
      );
    }
  };

  filterCounty = (e) => {
    if (e.target.value !== "Filter by County:") {
      this.setState(
        {
          [e.target.name]: e.target.value,
        },
        () => {
          this.filterByCounty();
        }
      );
    }
  };

  weatherAudit = () => {
    return <WeatherAudit logs={this.state.filteredLogs} />;
  };

  defaultLogs = () => {
    this.setState({
      states: [],
      counties: [],
      state: undefined,
      stateFiltered: false,
      county: undefined,
    });
    this.sanitizeDate(this.state.today);
  };

  render() {
    return (
      <div>
        <div className="view-header top-push">
          <div>
            <h1>THESE ARE TODAYS LOGS:</h1>
            {!this.props.createdToday && this.props.loggedInUser && (
              <div className="create-log-link">
                You haven't created a log today.{" "}
                <Link to="/create">Make one now!</Link>
              </div>
            )}
          </div>
          {this.state.filteredLogs && this.weatherAudit()}
        </div>
        <div className="filter-box">
          <div className="gender-filter">
            Filter By Gender:
            <br />
            <button onClick={this.filterByGender} value="male">
              male
            </button>
            <button onClick={this.filterByGender} value="female">
              female
            </button>
            <button onClick={this.filterByGender} value="nonbinary">
              non-binary
            </button>
            <br />
            {this.state.genderSearchMessage}
          </div>
          <div>
            Search Logs By Day:
            <br />
            <DatePicker onChange={this.onChange} value={this.state.date} />
          </div>
          <div>
            Filter By State:
            <br />
            <StateFilter states={this.state.states} filter={this.filterState} />
          </div>
          <div>
            Filter By County:
            <br />
            <CountyFilter
              counties={this.state.counties}
              filter={this.filterCounty}
            />
          </div>
          <div>
            <button className="view-default-logs" onClick={this.defaultLogs}>
              Back to Default
            </button>
          </div>
        </div>

        <div className="log-box">
          {this.state.filteredLogs && this.showLogs()}
        </div>
      </div>
    );
  }
}
