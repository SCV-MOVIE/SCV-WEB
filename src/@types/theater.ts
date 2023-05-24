import { Movie } from './movie';
import { Payment } from './payment';

export interface ShowTime {
  id: number;
  round: number;
  startDate: string; // yyyy-mm-dd hh:mm
  isPublic: boolean;
  movie: Movie;
  remainSeatNm: number;
  theaterName: Theater['name'];
  theaterSize: number;
}

export interface Theater {
  theaterNm: number;
  isOccupied: boolean;
  layout: string;
  name: string;
}

export interface TheaterType {
  id: number;
  value: 'NORMAL' | 'PREMIUM' | '3D';
}

export interface Seat {
  id: number;
  seatNm: number;
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
  ticket: Pick<Ticket, 'price' | 'paymentDate'>;
  movie: Pick<Movie, 'imgUrl' | 'name' | 'length'>;
  showTime: Pick<ShowTime, 'startDate'>;
  theater: Pick<Theater, 'name'>;
  seat: Seat[];
  payment: Pick<Payment, 'method'>;
};
