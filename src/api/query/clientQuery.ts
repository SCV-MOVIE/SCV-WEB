import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '..';
import { RequestUpdateUser, User } from '@root/src/@types';

const CLIENT_KEY = 'client';

export const useGetAllMembers = () =>
  useQuery([CLIENT_KEY], () => api.get<User[]>('/api/member/list').then((res) => res.data));

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestUpdateUser) => api.patch('/api/admin/member/info', data), {
    onSuccess: () => {
      queryClient.invalidateQueries([CLIENT_KEY]);
    },
  });
};
