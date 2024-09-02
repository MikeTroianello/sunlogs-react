import React from 'react';

const DeleteProfileSection = ({ onChange, onClick }) => {
  return (
    <div className='settings-delete'>
      <h1>Delete Profile</h1>
      <h4>
        <span className='red'>WARNING:</span> If you delete your profile, this
        cannot be undone!
      </h4>
      <p className='settings-delete-warning'>
        <i>
          Note: <br />
          if you delete your account, your logs will stay intact,
          <br />
          for mood aggregation purposes. <br />
          All of your journals will be erased, as will the names of the logs.
        </i>
      </p>
      <span>
        <b>Type in your Username Before Deletion</b>
      </span>
      <br></br>
      <input
        className='confirmDelete'
        name='confirmDelete'
        autoComplete='off'
        placeholder='make sure this is what you want...'
        style={{ fontSize: '1em', width: '250px' }}
        onChange={onChange}
      />
      <br />
      <button className='delete' onClick={onClick}>
        DELETE IT!
      </button>
    </div>
  );
};

export default DeleteProfileSection;
