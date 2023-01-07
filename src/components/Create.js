import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../auth/auth-service";
import { Redirect } from "react-router-dom";
import { create } from "../auth/authService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFrown as frown,
  faLaugh as happiest,
  faSmile as smile,
  faMeh as middlin,
  faSadTear as crying,
} from "@fortawesome/free-solid-svg-icons";

class Create extends Component {
  state = {
    mood: null,
    moodEmoji: null,
    productivity: null,
    journal: null,
    privateJournal: false,
    hideCreator: false,
    err: null,
    message: null,
    messageCss: "red",
    day: null,
    year: null,
  };

  service = new AuthService(this.props.user.token);

  componentDidMount() {
    if (this.props.user) {
      let today = new Date();
      var start = new Date(today.getFullYear(), 0, 0);
      var diff =
        today -
        start +
        (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      let a = today.toString().split(" ");
      var day = Math.floor(diff / oneDay);
      let year = Number(a[3]);

      this.setState({
        privateJournal: this.props.user.privateJournalDefault,
        hideCreator: this.props.user.hideCreatorDefault,
        dayOfYear: day,
        year: year,
        dayOfWeek: a[0],
        dayOfMonth: Number(a[2]),
        month: a[1],
      });
    }
  }

  handleChange = (e) => {
    if (e.target.value) {
      e.target.value = e.target.value.replace(/[\r\n\v]+/g, "");
    }
    this.setState({
      [e.target.id]: e.target.innerText || e.target.value,
    });
  };

  setMood = (num) => {
    let emoji;
    switch (num) {
      case 1:
        emoji = <FontAwesomeIcon icon={crying} />;
        break;
      case 2:
        emoji = <FontAwesomeIcon icon={frown} />;
        break;
      case 3:
        emoji = <FontAwesomeIcon icon={middlin} />;
        break;
      case 4:
        emoji = <FontAwesomeIcon icon={smile} />;
        break;
      default:
        emoji = <FontAwesomeIcon icon={happiest} />;
        break;
    }

    // IF SOMETHING BREAKS, IT IS PROBABLY DUE TO THIS
    return this.setState({
      mood: num,
      moodEmoji: emoji,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.createdToday) {
      this.setState({
        err: true,
        message: `You already created a log today!`,
        messageCss: "red",
      });
      setTimeout(function () {}, 1000);
    } else if (!this.state.mood) {
      this.setState({
        message: `You didn't select your mood`,
        messageCss: "red",
      });
    } else if (!this.state.productivity) {
      this.setState({
        message: `You didn't select your productivity`,
        messageCss: "red",
      });
    } else {
      let info = this.state;
      this.setState({
        message: "Submitting your log",
        messageCss: "black",
      });
      // this.service
      //   .create(info)
      create(info)
        .then((results) => {
          this.props.logCreated();
          this.props.history.push("/view");
        })
        .catch((error) => {
          this.setState({
            message: `There was an error submitting your log`,
          });
        });
    }
  };

  render() {
    if (this.state.err) {
      return <Redirect to="/view" />;
    }

    return (
      <div className="create-log-page">
        <div className="create-log">
          <h1>Create a Mood Log</h1>
          <div className="create-mood-box">
            <label htmlFor="mood">
              What is your mood? {this.state.moodEmoji}
            </label>
            <br />
            <div className="one-through-five">
              <FontAwesomeIcon
                id="mood"
                className="emotion"
                icon={crying}
                size="2x"
                onClick={() => this.setMood(1)}
              />
              <FontAwesomeIcon
                id="mood"
                icon={frown}
                size="2x"
                onClick={() => this.setMood(2)}
              />
              <FontAwesomeIcon
                id="mood"
                icon={middlin}
                size="2x"
                onClick={() => this.setMood(3)}
              />
              <FontAwesomeIcon
                id="mood"
                icon={smile}
                size="2x"
                onClick={() => this.setMood(4)}
              />
              <FontAwesomeIcon
                id="mood"
                icon={happiest}
                size="2x"
                onClick={() => this.setMood(5)}
              />
            </div>
          </div>
          <div className="create-productivity-box">
            <label htmlFor="productivity">
              How productive do you think you were today?{" "}
              <span className="one-through-five-box">
                <b>{this.state.productivity}</b>
              </span>
            </label>
            <br />
            <div className="one-through-five" onClick={this.handleChange}>
              <span id="productivity">1</span>
              <span id="productivity">2</span>
              <span id="productivity">3</span>
              <span id="productivity">4</span>
              <span id="productivity">5</span>
            </div>
          </div>
          <div>
            <label htmlFor="journal">
              What were some of your thoughts about today?
            </label>
            <textarea
              type="textbox"
              name="journal"
              id="journal"
              rows="6"
              cols="48"
              autocomplete="off"
              maxLength="250"
              placeholder="max length 250 characters"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="privateJournal">Make this a private Log:</label>
            <input
              type="checkbox"
              name="privateJournal"
              checked={this.state.privateJournal}
              onChange={() => {
                this.setState({
                  privateJournal: !this.state.privateJournal,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="hideCreator">Hide your status as creator*:</label>
            <input
              type="checkbox"
              name="hideCreator"
              checked={this.state.hideCreator}
              onChange={() => {
                this.setState({
                  hideCreator: !this.state.hideCreator,
                });
              }}
            />
            <p>
              (*Note: people will still see the contents of this log, they just
              will be unable to know you created it)
            </p>
          </div>
          <button className="create-log-button" onClick={this.handleSubmit}>
            Log It
          </button>
          <br></br>
          <b className={this.state.messageCss}>{this.state.message}</b>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Create);
