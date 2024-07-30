import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const getMoodIcon = (num) => {
  switch (num) {
    case 1:
      return <FontAwesomeIcon icon={crying} />;
    case 2:
      return <FontAwesomeIcon icon={frown} />;
    case 3:
      return <FontAwesomeIcon icon={middlin} />;
    case 4:
      return <FontAwesomeIcon icon={smile} />;
    default:
      return <FontAwesomeIcon icon={happiest} />;
  }
};
