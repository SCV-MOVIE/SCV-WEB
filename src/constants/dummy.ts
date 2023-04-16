import { Movie } from '@/@types';

export const DUMMY_MOVIE: Movie = {
  name: 'Joker',
  length: '1800',
  rating: '15+',
  genres: [
    { id: 1, value: 'Drama' },
    { id: 2, value: 'Comedy' },
    { id: 3, value: 'Adventure' },
  ],
  imgUrl: '/thumbnail.png',
  director: '',
  distributor: '',
  actors: [],
  staff: [],
};
