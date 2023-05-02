import { Movie } from './movie';

export interface ShowTime {
  id: number;
  round: number;
  startDate: Date;
  isPublic: boolean;
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

export type CheckTicket = Ticket & {
  movie: Movie;
  showTime: ShowTime;
};
