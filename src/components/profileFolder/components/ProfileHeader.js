import React from 'react';

const ProfileHeader = ({ isUserProfile, profileName }) => {
  const header = isUserProfile
    ? 'Your Profile Page'
    : `This is ${profileName}'s page`;

  return <h1>{header}</h1>;
};

export default ProfileHeader;
