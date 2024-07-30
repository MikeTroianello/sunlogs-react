import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faFrown as frown,
  faLaugh as happiest,
  faSmile as smile,
  faMeh as middlin,
  faSadTear as crying,
} from '@fortawesome/free-solid-svg-icons';

const MoodIcon = ({ mood }) => {
  switch (mood) {
    case 1:
      return <FontAwesomeIcon icon={crying} />;
    case 2:
      return <FontAwesomeIcon icon={frown} />;
    case 3:
      return <FontAwesomeIcon icon={middlin} />;
    case 4:
      return <FontAwesomeIcon icon={smile} />;
    case 5:
      return <FontAwesomeIcon icon={happiest} />;
    default:
      return '';
  }
};

export default MoodIcon;
