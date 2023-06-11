import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '..';
import { Genre, Movie, RequestGenre, RequestMovie, RequestUpdateMovie } from '@root/src/@types';

const MOVIE_KEY = 'movie';
const GENRE_KEY = 'genre';

export const useGetAllMovies = () =>
  useQuery([MOVIE_KEY], () => api.get<Movie[]>('/api/movie/list').then((res) => res.data));

export const useGetAllMovieGenres = () =>
  useQuery([MOVIE_KEY, GENRE_KEY], () =>
    api.get<Genre[]>('/api/movie/genre/list').then((res) => res.data),
  );

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestMovie) => api.post('/api/movie', data), {
    onSuccess: () => {
      queryClient.invalidateQueries([MOVIE_KEY]);
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestUpdateMovie) => api.patch('/api/movie', data), {
    onSuccess: () => {
      queryClient.invalidateQueries([MOVIE_KEY]);
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation((movieId: number) => api.patch('/api/movie/delete', { movieId }), {
    onSuccess: () => {
      queryClient.invalidateQueries([MOVIE_KEY]);
    },
  });
};

export const useCreateGenre = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestGenre) => api.post('/api/movie/genre', data), {
    onSuccess: () => {
      queryClient.invalidateQueries([MOVIE_KEY, GENRE_KEY]);
    },
  });
};

export const useDeleteGenre = () => {
  const queryClient = useQueryClient();
  return useMutation((data: RequestGenre) => api.patch(`/api/movie/genre/delete/${data.name}`), {
    onSuccess: () => {
      queryClient.invalidateQueries([MOVIE_KEY, GENRE_KEY]);
    },
  });
};
