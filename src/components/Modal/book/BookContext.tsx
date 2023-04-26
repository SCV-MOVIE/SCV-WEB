import React from 'react';

import { Movie, Partner, Payment } from '@root/src/@types';
import { ShowTime, Ticket } from '@root/src/@types/theater';

export interface HeadCount {
  adult: number;
  child: number;
}

export interface SelectedMovie {
  movie: Movie;
  showTime: ShowTime;
  headCount: HeadCount;
  selectedSeats: number[];
  payment: Pick<Payment, 'method'> & Pick<Ticket, 'usedPoint'> & { partner?: Partner };
  information: {
    name: string;
    phoneNumber: string;
    securityFrontNumber: string;
    securityBackNumber: string;
    agree: boolean;
  };
}

interface BookContextType {
  value: SelectedMovie;
  setValue: React.Dispatch<React.SetStateAction<SelectedMovie>>;
}

export const initialSelectedMovieValue: SelectedMovie = {
  movie: {
    id: -1,
    name: '',
    length: '',
    rating: '12+',
    director: '',
    distributor: '',
    imgUrl: '',
    actors: [],
    genres: [],
    staff: [],
  },
  showTime: {
    id: -1,
    startDate: new Date(),
    round: 1,
    isPublic: true,
  },
  headCount: {
    adult: 0,
    child: 0,
  },
  selectedSeats: [],
  payment: {
    method: undefined,
    usedPoint: 0,
    partner: {
      name: '',
      discount: 0,
    },
  },
  information: {
    name: '',
    phoneNumber: '',
    securityFrontNumber: '',
    securityBackNumber: '',
    agree: false,
  },
};

export const BookContext = React.createContext<BookContextType>({
  value: initialSelectedMovieValue,
  setValue: () => {},
});

export function createGenericUseContext<T>(context: React.Context<T>): () => NonNullable<T> {
  return (): NonNullable<T> => {
    const value: T = React.useContext<T>(context);

    return value as NonNullable<T>;
  };
}

export const useBookContext = createGenericUseContext<BookContextType>(BookContext);
export function BookContextProvider({
  value,
  setValue,
  children,
}: React.PropsWithChildren<BookContextType>) {
  return <BookContext.Provider value={{ value, setValue }}>{children}</BookContext.Provider>;
}