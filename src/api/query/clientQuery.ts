import { useQuery } from 'react-query';
import { api } from '..';
import { User } from '@root/src/@types';

const CLIENT_KEY = 'client';

export const useGetAllMembers = () =>
  useQuery([CLIENT_KEY], () => api.get<User[]>('/api/member/list').then((res) => res.data));
