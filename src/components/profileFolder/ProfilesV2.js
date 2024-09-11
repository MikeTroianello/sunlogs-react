import React from 'react';
import { connect } from 'react-redux';
import {
  faGenderless as nonbinary,
  faVenus as female,
  faMars as male,
} from '@fortawesome/free-solid-svg-icons';

import CreateLogButton from './components/CreateLogButton';
import MoodBox from './components/MoodBox';
import SortLogsButton from './components/SortLogsButton';
import DisplayLogs from './components/DisplayLogs';
import { useLogs } from '../../hooks/useLogs';
import ProfileHeader from './components/ProfileHeader';

const ProfilesV2 = (props) => {
  const { profileSelf, userRedux, match } = props || {};
  const { params } = match || {};
  const { id: userId } = params || {};

  const {
    isTodaysLogCreated,
    logs: hookLogs,
    mood,
    newestFirst,
    sortByAge,
  } = useLogs({ profileSelf, userRedux, userId });

  // TODO - Find new way to fetch name and genderIcons
  const name = null;
  const genderIcon = male || female || nonbinary;

  return (
    <div className='top-push'>
      <ProfileHeader isUserProfile={profileSelf} profileName={name} />
      {!isTodaysLogCreated && <CreateLogButton />}
      <MoodBox
        mood={mood}
        logs={hookLogs}
        name={name}
        profileSelf={profileSelf}
        gender={genderIcon}
      />
      <SortLogsButton
        onClick={sortByAge}
        logs={hookLogs}
        oldestFirst={!newestFirst}
      />
      <br></br>
      <DisplayLogs logs={hookLogs} oldestFirst={!newestFirst} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userRedux: state.user,
});

export default connect(mapStateToProps)(ProfilesV2);
