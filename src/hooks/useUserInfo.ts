import React from 'react';
import { User } from '../@types';
import { api } from '../api';

function useUserInfo() {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const result = await api.get<boolean>('/api/member/isLogin');
        setIsLogin(result.data);

        if (result.data) {
          const userResult = await api.get<User>('/api/member/info');
          setUser(userResult.data);
        }
      } catch (err) {}
    })();
  }, []);

  return {
    user,
    isLogin,
  };
}

export default useUserInfo;
