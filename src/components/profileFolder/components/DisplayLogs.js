import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogCard from '../../view-logs/LogCard';

const DisplayLogs = ({ logs, profileSelf }) => {
  const showCreateLog = !logs?.length && profileSelf;
  if (showCreateLog || !logs) {
    return (
      <div className='no-log-created'>
        You haven't created a log yet! <br />
        <Link to='/create'>Make one now!</Link>
      </div>
    );
  }
  return (
    <div className='log-box'>
      {logs.map((log) => {
        const { id } = log || {};
        return <LogCard log={log} key={id} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userRedux: state.user,
});

export default connect(mapStateToProps)(DisplayLogs);
