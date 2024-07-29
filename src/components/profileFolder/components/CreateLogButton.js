import React from 'react';
import { Link } from 'react-router-dom';

const CreateLogButton = () => {
  return (
    <h1>
      <b>
        You have not created a mood log today!{' '}
        <Link to='/create'>Create one now!</Link>
      </b>
    </h1>
  );
};

export default CreateLogButton;
