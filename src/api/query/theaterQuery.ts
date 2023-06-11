import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '..';
import { RequestTheater, RequestUpdateTheater, Theater } from '@root/src/@types';

const THEATER_KEY = 'theater';

export const useGetAllTheaters = () =>
  useQuery([THEATER_KEY], () => api.get<Theater[]>('/api/theater/list').then((res) => res.data));

export const useCreateTheater = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestTheater) => api.post('/api/theater', data), {
    onSuccess: () => {
      queryClient.invalidateQueries([THEATER_KEY]);
    },
  });
};

export const useUpdateTheater = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestUpdateTheater) => api.post('/api/theater/update', data), {
    onSuccess: () => {
      queryClient.invalidateQueries([THEATER_KEY]);
    },
  });
};

export const useDeleteTheater = () => {
  const queryClient = useQueryClient();
  return useMutation((theaterId: number) => api.patch(`/api/theater/delete/${theaterId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries([THEATER_KEY]);
    },
  });
};
