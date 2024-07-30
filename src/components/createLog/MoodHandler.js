import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFrown as frown,
  faLaugh as happiest,
  faSmile as smile,
  faMeh as middlin,
  faSadTear as crying,
} from '@fortawesome/free-solid-svg-icons';
import MoodIcon from './MoodIcon';

const MoodHandler = ({ onChange, mood }) => {
  return (
    <div className='create-mood-box'>
      <label htmlFor='mood'>
        What is your mood? <MoodIcon mood={mood} />
      </label>
      <br />
      <div className='one-through-five'>
        <FontAwesomeIcon
          id='mood'
          className='emotion'
          icon={crying}
          size='2x'
          onClick={() => onChange(1)}
        />
        <FontAwesomeIcon
          id='mood'
          icon={frown}
          size='2x'
          onClick={() => onChange(2)}
        />
        <FontAwesomeIcon
          id='mood'
          icon={middlin}
          size='2x'
          onClick={() => onChange(3)}
        />
        <FontAwesomeIcon
          id='mood'
          icon={smile}
          size='2x'
          onClick={() => onChange(4)}
        />
        <FontAwesomeIcon
          id='mood'
          icon={happiest}
          size='2x'
          onClick={() => onChange(5)}
        />
      </div>
    </div>
  );
};

export default MoodHandler;
