import { useQuery } from 'react-query';
import { api } from '..';
import { Theater } from '@root/src/@types';

const THEATER_KEY = 'theater';

export const useGetAllTheaters = () =>
  useQuery([THEATER_KEY], () => api.get<Theater[]>('/api/theater/list').then((res) => res.data));
