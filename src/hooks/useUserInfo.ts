import { AxiosError } from 'axios';
import React from 'react';
import { User } from '../@types';
import { api } from '../api';

function useUserInfo() {
  const [user, setUser] = React.useState<User | null>(null);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [isRefresh, setIsRefresh] = React.useState<boolean>(false);
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  const login = async (data: { loginId: string; password: string }) => {
    try {
      const result = await api.post('/api/member/login', data);
      if (result.status === 200) {
        setIsRefresh(true);
        return { isSuccess: true };
      }
      return { isSuccess: false };
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as { message: string };
      alert(data.message);
      return { isSuccess: false };
    }
  };

  const logout = async () => {
    try {
      const result = await api.post('/api/member/logout');
      if (result.status === 200) {
        setUser(null);
        setIsRefresh(true);
        setIsLogin(false);
        return { isSuccess: true };
      }
      return { isSuccess: false };
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as { message: string };
      alert(data.message);
      return { isSuccess: false };
    }
  };

  React.useEffect(() => {
    if ((isRefresh || !isMounted) && !user) {
      (async () => {
        try {
          const result = await api.get<boolean>('/api/member/isLogin');
          setIsLogin(result.data);

          if (result.data && !user) {
            const userResult = await api.get<User>('/api/member/info');
            setUser(userResult.data);
          }
        } catch (err) {
          const error = err as AxiosError;
          const data = error.response?.data as { message: string };
          alert(data.message);
        } finally {
          setIsRefresh(false);
        }
      })();
    }
  }, [isMounted, isRefresh, user]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    user,
    isLogin,
    login,
    logout,
  };
}

export default useUserInfo;
