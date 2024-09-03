import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { create } from '../auth/authService';
import MoodHandler from './createLog/MoodHandler';
import ProductivitySelector from './createLog/ProductivitySelector';
import JournalInput from './createLog/JournalInput';
import PrivateLogBox from './createLog/PrivateLogBox';
import HideCreatorBox from './createLog/HideCreatorBox';

const CreateLog = (props) => {
  const [mood, setMood] = useState(null);
  const [productivity, setProductivity] = useState(null);
  const [journal, setJournal] = useState(null);
  const [privateJournal, setPrivateJournal] = useState(false);
  const [hideCreator, setHideCreator] = useState(false);
  const [err, setErr] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [logYear, setLogYear] = useState(null);
  const [dayOfYear, setDayOfYear] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [dayOfMonth, setDayOfMonth] = useState(null);
  const [month, setMonth] = useState(null);

  const { user } = props || {};
  const { hideCreatorDefault, privateJournalDefault } = user || {};

  useEffect(() => {
    if (user) {
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

      setPrivateJournal(privateJournalDefault);
      setHideCreator(hideCreatorDefault);
      setDayOfYear(day);
      setLogYear(year);
      setDayOfYear(year);
      setDayOfWeek(a[0]);
      setDayOfMonth(month);
      setMonth(month);
    }
  }, [hideCreatorDefault, privateJournalDefault, user]);

  const productivityHandler = (e) => {
    const val = Number(e.target.innerText);
    if (!val) {
      return null;
    }
    setProductivity(val);
  };

  const journalHandler = (e) => {
    if (!e) {
      return null;
    }
    setJournal(e.target.value);
  };

  const moodHandler = (num) => {
    setMood(num);
  };

  const privateJournalHandler = () => {
    setPrivateJournal(!privateJournal);
  };

  const hideCreatorHandler = () => {
    setHideCreator(!hideCreator);
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
          // Does this serve any purpose?
          // moodEmoji,
          productivity,
          journal,
          privateJournal,
          hideCreator,
          err,
          message,
          year: logYear,
          dayOfYear,
          dayOfWeek,
          dayOfMonth,
          month,
        };
        setMessage('Submitting your log');
        await create(info);
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
        <MoodHandler onChange={moodHandler} mood={mood} />
        <ProductivitySelector
          productivity={productivity}
          onClick={productivityHandler}
        />
        <JournalInput onChange={journalHandler} />
        <PrivateLogBox
          onChange={privateJournalHandler}
          checked={privateJournal}
        />
        <HideCreatorBox checked={hideCreator} onChange={hideCreatorHandler} />
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
