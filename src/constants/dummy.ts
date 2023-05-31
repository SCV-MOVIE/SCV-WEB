import type { Movie } from '@/@types';
import type { CheckTicket, ShowTime, TheaterType, Ticket } from '../@types/theater';

export const DUMMY_MOVIE: Movie = {
  id: 1,
  name: 'Joker',
  length: 82,
  rating: '18+',
  genreDTOList: [{ name: 'Drama' }, { name: 'Comedy' }, { name: 'Adventure' }],
  imgUrl: '/thumbnail.jpeg',
  director: 'Joker Director',
  introduction:
    'Joker is simple good. Joker is simple good. Joker is simple good. Joker is simple good.',
  distributor: 'Joker Distributor',
  actor: 'John,Sarah,King',
  staff: 'Queen,Ku,Kang',
};

export const DUMMY_MOVIE2: Movie = {
  id: 2,
  name: '스즈메의 문단속',
  length: 182,
  rating: 'All',
  genreDTOList: [{ name: 'Action' }],
  imgUrl: '/door.jpeg',
  director: '스즈메 Director',
  introduction:
    '스즈메 is simple good. 스즈메 is simple good. 스즈메 is simple good. 스즈메 is simple good.',
  distributor: '스즈메 Distributor',
  actor: 'John,Sarah,King',
  staff: 'Queen,Ku,Kang',
};

export const DUMMY_MOVIE3: Movie = {
  id: 3,
  name: '슈퍼 마리오 브라더스',
  length: 122,
  rating: '12+',
  genreDTOList: [{ name: 'Action' }],
  imgUrl: '/mario.jpeg',
  director: '마리오 Director',
  introduction:
    '마리오 is simple good. 마리오 is simple good. 마리오 is simple good. 마리오 is simple good.',
  distributor: '마리오 Distributor',
  actor: 'John,Sarah,King',
  staff: 'Queen,Ku,Kang',
};

export const DUMMY_MOVIE4: Movie = {
  id: 4,
  name: '어벤져스',
  length: 132,
  rating: '15+',
  genreDTOList: [{ name: 'Action' }],
  imgUrl: '/aven.jpeg',
  director: '어벤져스 Director',
  introduction:
    '어벤져스 is simple good. 어벤져스 is simple good. 어벤져스 is simple good. 어벤져스 is simple good.',
  distributor: '어벤져스 Distributor',
  actor: 'John,Sarah,King',
  staff: 'Queen,Ku,Kang',
};

export const DUMMY_MOVIE5: Movie = {
  id: 5,
  name: '기생충',
  length: 132,
  rating: '15+',
  genreDTOList: [{ name: 'Action' }],
  imgUrl: '/para.jpeg',
  director: '기생충 Director',
  introduction:
    '기생충 is simple good. 기생충 is simple good. 기생충 is simple good. 기생충 is simple good.',
  distributor: '기생충 Distributor',
  actor: 'John,Sarah,King',
  staff: 'Queen,Ku,Kang',
};

export const DUMMY_MOVIE6: Movie = {
  id: 6,
  name: '범죄도시',
  length: 92,
  rating: '15+',
  genreDTOList: [{ name: 'Action' }],
  imgUrl: '/crime.jpeg',
  director: '범죄도시 Director',
  introduction:
    '범죄도시 is simple good. 범죄도시 is simple good. 범죄도시 is simple good. 범죄도시 is simple good.',
  distributor: '범죄도시 Distributor',
  actor: 'John,Sarah,King',
  staff: 'Queen,Ku,Kang',
};

export const DUMMY_MOVIES = [
  DUMMY_MOVIE,
  DUMMY_MOVIE2,
  DUMMY_MOVIE3,
  DUMMY_MOVIE4,
  DUMMY_MOVIE5,
  DUMMY_MOVIE6,
];

export const DUMMY_SHOWTIME: ShowTime = {
  id: 1,
  round: 1,
  startDate: '2023-05-23 14:05',
  isPublic: true,
  movieDTO: DUMMY_MOVIE,
  remainSeatNm: 23,
  theaterName: '1관',
  theaterType: '3D',
  theaterSize: 30,
};
const createShowTime = (
  movieDTO: Movie,
  startDate: string,
  id: number,
  theaterType: TheaterType['value'],
): ShowTime => ({
  id,
  round: 1,
  startDate,
  isPublic: true,
  movieDTO,
  remainSeatNm: 23,
  theaterName: '1관',
  theaterType,
  theaterSize: 30,
});

export const DUMMY_SHOWTIMES: ShowTime[] = [
  createShowTime(DUMMY_MOVIE, '2023-05-25 09:05', 1, '3D'),
  createShowTime(DUMMY_MOVIE, '2023-05-24 14:05', 2, 'NORMAL'),
  createShowTime(DUMMY_MOVIE, '2023-05-23 16:42', 3, 'NORMAL'),
  createShowTime(DUMMY_MOVIE, '2023-05-23 12:05', 4, '3D'),
  createShowTime(DUMMY_MOVIE, '2023-05-23 14:05', 5, 'PREMIUM'),
  createShowTime(DUMMY_MOVIE, '2023-05-26 14:05', 6, '3D'),
  createShowTime(DUMMY_MOVIE, '2023-05-24 18:05', 7, '3D'),
  createShowTime(DUMMY_MOVIE, '2023-05-24 19:31', 8, '3D'),
  createShowTime(DUMMY_MOVIE2, '2023-05-25 09:05', 1, '3D'),
  createShowTime(DUMMY_MOVIE2, '2023-05-24 14:05', 2, 'NORMAL'),
  createShowTime(DUMMY_MOVIE2, '2023-05-23 16:42', 3, 'NORMAL'),
  createShowTime(DUMMY_MOVIE2, '2023-05-23 12:05', 4, '3D'),
  createShowTime(DUMMY_MOVIE2, '2023-05-23 14:05', 5, 'PREMIUM'),
  createShowTime(DUMMY_MOVIE2, '2023-05-26 14:05', 6, '3D'),
  createShowTime(DUMMY_MOVIE2, '2023-05-24 18:05', 7, '3D'),
  createShowTime(DUMMY_MOVIE2, '2023-05-24 19:31', 8, '3D'),
  createShowTime(DUMMY_MOVIE3, '2023-05-25 09:05', 1, '3D'),
  createShowTime(DUMMY_MOVIE3, '2023-05-24 14:05', 2, 'NORMAL'),
  createShowTime(DUMMY_MOVIE3, '2023-05-23 16:42', 3, 'NORMAL'),
  createShowTime(DUMMY_MOVIE3, '2023-05-23 12:05', 4, '3D'),
  createShowTime(DUMMY_MOVIE3, '2023-05-23 14:05', 5, 'PREMIUM'),
  createShowTime(DUMMY_MOVIE3, '2023-05-26 14:05', 6, '3D'),
  createShowTime(DUMMY_MOVIE3, '2023-05-24 18:05', 7, '3D'),
  createShowTime(DUMMY_MOVIE3, '2023-05-24 19:31', 8, '3D'),
  createShowTime(DUMMY_MOVIE4, '2023-05-25 09:05', 1, '3D'),
  createShowTime(DUMMY_MOVIE4, '2023-05-24 14:05', 2, 'NORMAL'),
  createShowTime(DUMMY_MOVIE4, '2023-05-23 16:42', 3, 'NORMAL'),
  createShowTime(DUMMY_MOVIE4, '2023-05-23 12:05', 4, '3D'),
  createShowTime(DUMMY_MOVIE4, '2023-05-23 14:05', 5, 'PREMIUM'),
  createShowTime(DUMMY_MOVIE4, '2023-05-26 14:05', 6, '3D'),
  createShowTime(DUMMY_MOVIE4, '2023-05-24 18:05', 7, '3D'),
  createShowTime(DUMMY_MOVIE4, '2023-05-24 19:31', 8, '3D'),
  createShowTime(DUMMY_MOVIE5, '2023-05-25 09:05', 1, '3D'),
  createShowTime(DUMMY_MOVIE5, '2023-05-24 14:05', 2, 'NORMAL'),
  createShowTime(DUMMY_MOVIE5, '2023-05-23 16:42', 3, 'NORMAL'),
  createShowTime(DUMMY_MOVIE5, '2023-05-23 12:05', 4, '3D'),
  createShowTime(DUMMY_MOVIE5, '2023-05-23 14:05', 5, 'PREMIUM'),
  createShowTime(DUMMY_MOVIE5, '2023-05-26 14:05', 6, '3D'),
  createShowTime(DUMMY_MOVIE5, '2023-05-24 18:05', 7, '3D'),
  createShowTime(DUMMY_MOVIE5, '2023-05-24 19:31', 8, '3D'),
  createShowTime(DUMMY_MOVIE6, '2023-05-25 09:05', 1, '3D'),
  createShowTime(DUMMY_MOVIE6, '2023-05-24 14:05', 2, 'NORMAL'),
  createShowTime(DUMMY_MOVIE6, '2023-05-23 16:42', 3, 'NORMAL'),
  createShowTime(DUMMY_MOVIE6, '2023-05-23 12:05', 4, '3D'),
  createShowTime(DUMMY_MOVIE6, '2023-05-23 14:05', 5, 'PREMIUM'),
  createShowTime(DUMMY_MOVIE6, '2023-05-26 14:05', 6, '3D'),
  createShowTime(DUMMY_MOVIE6, '2023-05-24 18:05', 7, '3D'),
  createShowTime(DUMMY_MOVIE6, '2023-05-24 19:31', 8, '3D'),
];

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
  movieImgUrl: '/thumbnail.jpeg',
  movieLength: 221,
  movieName: 'saw',
  movieStartTime: 'yyyy-MM-dd HH:mm',
  paymentDate: 'yyyy-MM-dd HH:mm:ss',
  paymentMethod: 'ACCOUNT',
  peopleNm: 2,
  price: 20000,
  reserveNm: '16자리 스트링 값',
  seatInfo: 'A1, A2',
  status: 'PRINTED',
  theaterName: '1관',
  ticketId: 1,
  usedPoint: 1000,
};
