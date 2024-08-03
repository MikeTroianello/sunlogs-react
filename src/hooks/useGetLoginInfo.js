import { useEffect, useState } from 'react';
import { loggedin } from '../auth/authService';

export const useGetLoginInfo = (loggedInUser) => {
  const [loginInfo, setLoginInfo] = useState(loggedInUser);

  const getLoginInfo = async () => {
    const response = await loggedin();
    setLoginInfo(response);
  };

  useEffect(() => {
    if (!loggedInUser) {
      getLoginInfo();
    }
  }, []);

  return loginInfo;
};
