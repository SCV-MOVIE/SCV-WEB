import type { Movie } from '@/@types';
import type { CheckTicket, ShowTime, Ticket } from '../@types/theater';

export const DUMMY_MOVIE: Movie = {
  id: 1,
  name: 'Joker',
  length: '1800',
  rating: '18+',
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

const DUMMY_TICKET: Ticket = {
  id: 1,
  price: 35000,
  paymentDate: new Date().toUTCString(),
  status: 'PAYED',
  usedPoint: 3000,
  reserveNumber: 'AD30BD30AC20DA20',
  showTimeId: 1,
  userId: 1,
};

export const DUMMY_CHECK_TICKET: CheckTicket = {
  ticket: {
    price: DUMMY_TICKET.price,
    paymentDate: DUMMY_TICKET.paymentDate,
  },
  movie: {
    name: DUMMY_MOVIE.name,
    imgUrl: DUMMY_MOVIE.imgUrl,
    length: DUMMY_MOVIE.length,
  },
  showTime: {
    startDate: DUMMY_SHOWTIME.startDate,
  },
  seat: [
    { id: 1, seatNm: 1 },
    { id: 2, seatNm: 2 },
  ],
  theater: {
    name: '3D',
  },
  payment: {
    method: 'CARD',
  },
};
