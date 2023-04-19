import React from 'react';

import { Movie } from '@root/src/@types';
import { ShowTime } from '@root/src/@types/theater';

export interface HeadCount {
  adult: number;
  child: number;
}

export interface SelectedMovie {
  movie: Movie;
  showTime: ShowTime;
  headCount: HeadCount;
}

interface BookContextType {
  value: SelectedMovie;
  onChange: React.Dispatch<React.SetStateAction<SelectedMovie>>;
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
    date: '',
    startTime: '',
    round: 1,
    isPublic: true,
  },
  headCount: {
    adult: 0,
    child: 0,
  },
};

export const BookContext = React.createContext<BookContextType>({
  value: initialSelectedMovieValue,
  onChange: () => {},
});

function createGenericUseContext<T>(context: React.Context<T>): () => NonNullable<T> {
  return (): NonNullable<T> => {
    const value: T = React.useContext<T>(context);

    return value as NonNullable<T>;
  };
}

export const useBookContext = createGenericUseContext<BookContextType>(BookContext);
export function BookContextProvider({
  value,
  onChange,
  children,
}: React.PropsWithChildren<BookContextType>) {
  return <BookContext.Provider value={{ value, onChange }}>{children}</BookContext.Provider>;
}
