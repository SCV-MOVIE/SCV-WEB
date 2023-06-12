import React from 'react';

import { Movie, Partner, Payment, User } from '@root/src/@types';
import { ShowTime, Ticket } from '@root/src/@types/theater';
import { DUMMY_MOVIE } from '@root/src/constants/dummy';

export interface HeadCount {
  adult: number;
  child: number;
}

export interface SelectedMovie {
  movie: Movie;
  showTime: ShowTime;
  headCount: HeadCount;
  selectedSeats: string[];
  payment: Pick<Payment, 'method'> &
    Pick<Ticket, 'usedPoint'> &
    Pick<User, 'membership'> & { partner?: Partner; account?: string };
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
    length: '-1',
    rating: '12+',
    director: '',
    distributor: '',
    imgUrl: '',
    introduction: '',
    actor: '',
    genreDTOList: [],
    staff: '',
  },
  showTime: {
    id: -1,
    startDate: '2022-05-23 14:12',
    round: 1,
    isPublic: 'Y',
    movieDTO: DUMMY_MOVIE,
    remainSeatNm: 23,
    theaterId: -1,
    theaterLayout: '',
    theaterName: '1관',
    theaterType: '3D',
    theaterSize: 30,
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
      partnerId: -1,
      name: '',
      discount: 0,
    },
    account: '',
    membership: 'COMMON',
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
