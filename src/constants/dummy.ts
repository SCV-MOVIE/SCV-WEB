import type { Movie } from '@/@types';
import type { CheckTicket, ShowTime } from '../@types/theater';

export const DUMMY_MOVIE: Movie = {
  id: 1,
  name: 'Joker',
  length: '1800',
  rating: '15+',
  genres: [
    { id: 1, value: 'Drama' },
    { id: 2, value: 'Comedy' },
    { id: 3, value: 'Adventure' },
  ],
  imgUrl: '/thumbnail.jpeg',
  director: 'Joker Director',
  introduction:
    'Joker is simple good. Joker is simple good. Joker is simple good. Joker is simple good.',
  distributor: 'Joker Distributor',
  actors: 'John,Sarah,King',
  staff: 'Queen,Ku,Kang',
};

export const DUMMY_SHOWTIME: ShowTime = {
  id: 1,
  round: 1,
  startDate: new Date(),
  isPublic: true,
};

export const DUMMY_CHECK_TICKET: CheckTicket = {
  id: 1,
  price: 35000,
  paymentDate: new Date().toUTCString(),
  status: 'PAYED',
  usedPoint: 3000,
  reserveNumber: 'AD30BD30AC20DA20',
  showTimeId: 1,
  userId: 1,
  movie: DUMMY_MOVIE,
  showTime: DUMMY_SHOWTIME,
};
