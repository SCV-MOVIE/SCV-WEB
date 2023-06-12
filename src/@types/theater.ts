import { Movie } from './movie';
import { Payment } from './payment';
import { User } from './user';

export interface ShowTime {
  id: number;
  round: number;
  startDate: string; // yyyy-mm-dd hh:mm
  isPublic: 'Y' | 'N';
  movieDTO: Movie;
  remainSeatNm: number;
  theaterId: number;
  theaterName: string;
  theaterLayout: string;
  theaterType: TheaterType['value'];
  theaterSize: number;
}

export interface RequestShowTime {
  movieId: number;
  round: number;
  startDate: string;
  startTime: string;
  theaterId: number;
}

export interface RequestUpdateShowTime {
  showtimeId: number;
  movieId: number;
  round: number;
  startDate: string;
  theaterId: number;
}

export interface Theater {
  id: number;
  theaterNm: number;
  layout: string;
  name: string;
  deleted: 'Y' | 'N';
  theaterType: TheaterType | Pick<TheaterType, 'value'>;
}

export interface RequestTheater {
  column: number;
  row: number;
  name: string;
  theaterType: TheaterType | Pick<TheaterType, 'value'>;
}

export type RequestUpdateTheater = RequestTheater & {
  theaterId: number;
};

export interface TheaterType {
  id: number;
  value: 'NORMAL' | 'PREMIUM' | '3D';
}

export interface Seat {
  id: number;
  seatNm: string;
}

export interface Ticket {
  id: number;
  price: number;
  paymentDate: string;
  status: 'STANDBY' | 'PAYED' | 'PRINTED' | 'CANCELLED' | 'REJECTED';
  usedPoint: number;
  reserveNumber: string;
  showTimeId: number;
  userId: number;
}

export type CheckTicket = {
  movieImgUrl: Movie['imgUrl'];
  movieLength: Movie['length'];
  movieName: Movie['name'];
  movieStartTime: ShowTime['startDate'];
  paymentDate: Ticket['paymentDate'];
  paymentMethod: Payment['method'];
  peopleNm: number;
  price: Ticket['price'];
  reserveNm: Ticket['reserveNumber'];
  seatInfo: Seat['seatNm'];
  status: Ticket['status'];
  theaterName: Theater['name'];
  ticketId: Ticket['id'];
  usedPoint: User['point'];
};
