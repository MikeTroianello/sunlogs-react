import { useState, useEffect, useCallback } from 'react';
import { profile, seeUser } from '../auth/authService';

//TODO: Add seeUser to see other profiles

export const useLogs = ({ profileSelf, userRedux }) => {
  const [logs, setLogs] = useState([]);
  const [newestFirst, setNewestFirst] = useState(true);

  const fetchLogs = useCallback(async () => {
    const fetchedLogs = await profile(userRedux.token);
    setLogs(fetchedLogs);
  }, [setLogs, userRedux]);

  const sortByAge = () => {
    let sortedLogs = logs.reverse();
    setNewestFirst(!newestFirst);
    setLogs(sortedLogs);
  };

  const today = new Date().setHours(0, 0, 0, 0);

  let isTodaysLogCreated = logs.find(({ date }) => {
    const creationDate = new Date(date).setHours(0, 0, 0, 0);
    return today === creationDate;
  });

  let mood =
    Math.round(
      100 *
        (logs.reduce((accumulator, currentLog) => {
          return accumulator + currentLog.mood;
        }, 0) /
          logs.length),
      0
    ) / 100;

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { isTodaysLogCreated, logs, mood, newestFirst, sortByAge };
};
