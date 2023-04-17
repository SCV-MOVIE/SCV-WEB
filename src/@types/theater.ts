export interface ShowTime {
  id: number;
  date: string;
  round: number;
  startTime: string;
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
  value: 'NORMAL' | 'PREMIUM' | '3D'
}

export interface Seat {
  id: number;
  seatNm: number;
}

export interface Ticket {
  id: number;
  price: number;
  paymentDate: string;
  status: 'STANDBY' | 'PAYED' | 'PRINTED' | 'CANCELLED' | 'REJECTED'
  usedPoint: number;
}
