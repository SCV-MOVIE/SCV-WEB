import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '..';
import { RequestShowTime, RequestUpdateShowTime, ShowTime } from '@root/src/@types';

const SHOWTIME_KEY = 'showtime';

export const useGetAllShowTimes = () =>
  useQuery(
    [SHOWTIME_KEY],
    () => api.get<ShowTime[]>('/api/showtime/list').then((res) => res.data),
    { refetchOnWindowFocus: false },
  );

export const useGetSuggestedStartDate = (movieId: number) =>
  useQuery(
    [SHOWTIME_KEY, movieId],
    () => api.get<string>(`/api/showtime/suggest/startDate/${movieId}`).then((res) => res.data),
    {
      enabled: Boolean(movieId),
    },
  );

export const useCreateShowTime = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestShowTime) => api.post('/api/showtime', data), {
    onSuccess: () => {
      queryClient.invalidateQueries([SHOWTIME_KEY]);
    },
  });
};

export const useUpdateShowTime = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestUpdateShowTime) => api.patch('/api/showtime', data), {
    onSuccess: () => {
      queryClient.invalidateQueries([SHOWTIME_KEY]);
    },
  });
};

export const useDeleteShowTime = () => {
  const queryClient = useQueryClient();
  return useMutation((showTimeId: number) => api.delete(`/api/showtime/${showTimeId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries([SHOWTIME_KEY]);
    },
  });
};

export const usePublishShowTime = () => {
  const queryClient = useQueryClient();
  return useMutation((showTimeId: number) => api.patch(`/api/showtime/public/${showTimeId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries([SHOWTIME_KEY]);
    },
  });
};
