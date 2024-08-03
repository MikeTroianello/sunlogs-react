import React from 'react';
import PreferencesHeader from './PreferencesHeader';
import HideProfile from './HideProfile';
import MakeJournalsPrivate from './MakeJournalsPrivate';
import HideName from './HideName';
import ChangePreferenceButton from './ChangePreferenceButton';

const Preferences = ({
  hideProfile,
  privateJournalDefault,
  hideCreatorDefault,
  onClick,
  changeTheInfo,
}) => {
  return (
    <div className='settings-change-preferences'>
      <PreferencesHeader />
      <HideProfile hideProfile={hideProfile} onClick={onClick} />
      <MakeJournalsPrivate
        privateJournalDefault={privateJournalDefault}
        onClick={onClick}
      />
      <HideName hideCreatorDefault={hideCreatorDefault} onClick={onClick} />
      <ChangePreferenceButton onClick={changeTheInfo} />
    </div>
  );
};

export default Preferences;
