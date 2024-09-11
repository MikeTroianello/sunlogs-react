import { useState, useEffect } from 'react';
import { getDate } from '../auth/authService';

export const useViewAllLogs = () => {
  const [allLogs, setAllLogs] = useState([]);

  const getAllLogs = async () => {
    const results = await getDate(new Date());
    setAllLogs(results);
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  return { allLogs };
};
