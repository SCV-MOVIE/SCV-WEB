import { useQuery } from 'react-query';
import { api } from '..';
import { ShowTime } from '@root/src/@types';

const SHOWTIME_KEY = 'showtime';

export const useGetAllShowTimes = () =>
  useQuery([SHOWTIME_KEY], () => api.get<ShowTime[]>('/api/showtime/list').then((res) => res.data));

export const useGetSuggestedStartDate = (movieId: number) =>
  useQuery(
    [SHOWTIME_KEY, movieId],
    () => api.get<string>(`/api/showtime/suggest/startDate/${movieId}`).then((res) => res.data),
    {
      enabled: Boolean(movieId),
    },
  );
