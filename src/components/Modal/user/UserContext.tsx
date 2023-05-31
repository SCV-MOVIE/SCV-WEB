import { User } from '@root/src/@types';
import React from 'react';
import { createGenericUseContext } from '../book/BookContext';

export const initialUserValue: User = {
  id: -1,
  loginId: '',
  point: 0,
  name: '',
  phoneNumber: '',
  membership: 'VVIP',
};

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = React.createContext<UserContextType>({
  user: initialUserValue,
  setUser: () => {},
});

export const useUserContext = createGenericUseContext<UserContextType>(UserContext);
export function UserContextProvider({
  user,
  setUser,
  children,
}: React.PropsWithChildren<UserContextType>) {
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
