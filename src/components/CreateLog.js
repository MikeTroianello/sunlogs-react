import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { create } from '../auth/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFrown as frown,
  faLaugh as happiest,
  faSmile as smile,
  faMeh as middlin,
  faSadTear as crying,
} from '@fortawesome/free-solid-svg-icons';

const CreateLog = (props) => {
  const [mood, setMood] = useState(null);
  const [moodEmoji, setMoodEmoji] = useState(null);
  const [productivity, setProductivity] = useState(null);
  const [journal, setJournal] = useState(null);
  const [privateJournal, setPrivateJournal] = useState(false);
  const [hideCreator, setHideCreator] = useState(false);
  const [err, setErr] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageCss, setMessageCss] = useState('red');
  const [logDay, setLogDay] = useState(null);
  const [logYear, setLogYear] = useState(null);
  const [dayOfYear, setDayOfYear] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [dayOfMonth, setDayOfMonth] = useState(null);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    if (props.user) {
      let today = new Date();
      var start = new Date(today.getFullYear(), 0, 0);
      var diff =
        today -
        start +
        (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      let a = today.toString().split(' ');
      var day = Math.floor(diff / oneDay);
      let year = Number(a[3]);
      const month = Number(a[2]);

      setPrivateJournal(props.user.privateJournalDefault);
      setHideCreator(props.user.hideCreatorDefault);
      setDayOfYear(day);
      setLogYear(year);
      setDayOfYear(year);
      setDayOfWeek(a[0]);
      setDayOfMonth(month);
      setMonth(month);
    }
  }, []);

  const productivityHandler = (e) => {
    const val = Number(e.target.innerText);
    if (!val) {
      return null;
    }
    setProductivity(val);
  };

  const moodHandler = (num) => {
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
    setMood(num);
    setMoodEmoji(emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.createdToday) {
      setErr(true);
      setErrorMessage('You already created a log today!');
      setTimeout(function () {}, 1000);
    } else if (!mood) {
      setErrorMessage(`You didn't select your mood`);
    } else if (!productivity) {
      setErrorMessage(`You didn't select your productivity`);
    } else {
      try {
        let info = {
          mood,
          moodEmoji,
          productivity,
          journal,
          privateJournal,
          hideCreator,
          err,
          message,
          errorMessage,
          messageCss,
          day: logDay,
          year: logYear,
          dayOfYear,
          dayOfWeek,
          dayOfMonth,
          month,
        };
        setMessage('Submitting your log');
        const results = await create(info);
        props.logCreated();
        props.history.push('/view');
      } catch (error) {
        setErrorMessage(`There was an error submitting your log`);
      }
    }
  };

  if (err) {
    return <Redirect to='/view' />;
  }

  return (
    <div className='create-log-page'>
      <div className='create-log'>
        <h1>Create a Mood Log</h1>
        <div className='create-mood-box'>
          <label htmlFor='mood'>What is your mood? {moodEmoji}</label>
          <br />
          <div className='one-through-five'>
            <FontAwesomeIcon
              id='mood'
              className='emotion'
              icon={crying}
              size='2x'
              onClick={() => moodHandler(1)}
            />
            <FontAwesomeIcon
              id='mood'
              icon={frown}
              size='2x'
              onClick={() => moodHandler(2)}
            />
            <FontAwesomeIcon
              id='mood'
              icon={middlin}
              size='2x'
              onClick={() => moodHandler(3)}
            />
            <FontAwesomeIcon
              id='mood'
              icon={smile}
              size='2x'
              onClick={() => moodHandler(4)}
            />
            <FontAwesomeIcon
              id='mood'
              icon={happiest}
              size='2x'
              onClick={() => moodHandler(5)}
            />
          </div>
        </div>
        <div className='create-productivity-box'>
          <label htmlFor='productivity'>
            How productive do you think you were today?{' '}
            <span className='one-through-five-box'>
              <b>{productivity}</b>
            </span>
          </label>
          <br />
          <div className='one-through-five' onClick={productivityHandler}>
            <span id='productivity'>1</span>
            <span id='productivity'>2</span>
            <span id='productivity'>3</span>
            <span id='productivity'>4</span>
            <span id='productivity'>5</span>
          </div>
        </div>
        <div>
          <label htmlFor='journal'>
            What were some of your thoughts about today?
          </label>
          <textarea
            type='textbox'
            name='journal'
            id='journal'
            rows='6'
            cols='48'
            autoComplete='off'
            maxLength='250'
            placeholder='max length 250 characters'
            onChange={(e) => setJournal(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='privateJournal'>Make this a private Log:</label>
          <input
            type='checkbox'
            name='privateJournal'
            checked={privateJournal}
            onChange={() => {
              setPrivateJournal(!privateJournal);
            }}
          />
        </div>
        <div>
          <label htmlFor='hideCreator'>Hide your status as creator*:</label>
          <input
            type='checkbox'
            name='hideCreator'
            checked={hideCreator}
            onChange={() => {
              setHideCreator(!hideCreator);
            }}
          />
          <p>
            (*Note: people will still see the contents of this log, they just
            will be unable to know you created it)
          </p>
        </div>
        <button className='create-log-button' onClick={handleSubmit}>
          Log It
        </button>
        <br></br>
        {errorMessage && <b className='red'>{errorMessage}</b>}
        {message && <b className='black'>{message}</b>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(CreateLog);
