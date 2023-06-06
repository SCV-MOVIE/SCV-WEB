import { useQuery } from 'react-query';
import { api } from '..';
import { Movie } from '@root/src/@types';

const MOVIE_KEY = 'movie';

export const useGetAllMovies = () =>
  useQuery([MOVIE_KEY], () => api.get<Movie[]>('/api/movie/list').then((res) => res.data));
