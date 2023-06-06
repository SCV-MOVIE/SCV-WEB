import { useQuery } from 'react-query';
import { api } from '..';
import { ShowTime } from '@root/src/@types';

const SHOWTIME_KEY = 'showtime';

export const useGetAllShowTimes = () =>
  useQuery([SHOWTIME_KEY], () =>
    api.get<ShowTime[]>('/api/showtime/public-list').then((res) => res.data),
  );
