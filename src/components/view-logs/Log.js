import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGenderless as nonbinary,
  faVenus as female,
  faMars as male,
} from '@fortawesome/free-solid-svg-icons';

export default function Log(props) {
  let weatherString;
  let genderIcon;
  //AS OF NOW, THE ICONS WILL ONLY SHOW THE DAYTIME IMAGES, FOR SIMPLICITY. THIS CAN BE CHANGED AT THE WEATHERSTRING VARIABLE
  if (props.log.weatherIcon) {
    weatherString = `http://openweathermap.org/img/wn/${props.log.weatherIcon.slice(
      0,
      -1
    )}d@2x.png`;
  } else weatherString = '';

  switch (props.log.creatorId.gender) {
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

  let theTag = props.log.creatorId.username;

  // if (props.log.creatorId._id) {
  if (!props.log.demo) {
    theTag = (
      <Link to={`/view-profile/${props.log.creatorId._id}`}>
        {props.log.creatorId.username}
      </Link>
    );
  }

  if (
    props.log.creatorId.username ===
      'This user has decided to keep their name private' ||
    props.id === props.log.creatorId._id
  ) {
    theTag = props.log.creatorId.username;
  }

  return (
    <div className={props.test ? 'mock-log' : 'log'}>
      <div className='log-head '>
        <span>
          <h3 className='name-and-gender'>
            <div className='name-box'>
              {props.id === props.log.creatorId._id ? <i>~(You!)~</i> : theTag}
            </div>
            <div className='gender'>
              <FontAwesomeIcon icon={genderIcon} size='2x' />
            </div>
            <div className='weather-box'>
              <span>
                <img
                  className='weather-icon'
                  src={weatherString}
                  alt={props.log.weatherType}
                />
              </span>
              <p> {props.log.weatherType}</p>
            </div>
          </h3>
          {props.log.creatorId.username !==
            'This user has decided to keep their name private' &&
            props.log.hideCreator && (
              <i>You have hidden your name for this log</i>
            )}
        </span>
      </div>
      <h2>
        {props.log.county} County, {props.log.state}
      </h2>
      <div className='mood-and-productivity'>
        <h3>
          Mood: <p>{props.log.mood}</p>
        </h3>
        <h3>
          Productivity: <p>{props.log.productivity}</p>
        </h3>
      </div>
      <h4>Log: {props.log.journal}</h4>
      {props.log.journal !== 'This log is set to private' &&
        props.log.privateJournal && <i>You made this log private</i>}
    </div>
  );
}
