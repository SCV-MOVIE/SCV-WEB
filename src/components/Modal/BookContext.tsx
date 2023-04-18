import React, { createContext, useContext } from 'react';

import { Movie } from '@root/src/@types';
import { ShowTime } from '@root/src/@types/theater';
import { DUMMY_MOVIE, DUMMY_SHOWTIME } from '@root/src/constants/dummy';

interface SelectedMovie {
  movie: Movie;
  showTime: ShowTime;
}

export const BookContext = createContext<SelectedMovie>({
  movie: DUMMY_MOVIE,
  showTime: DUMMY_SHOWTIME,
});

interface Props {
  value: SelectedMovie;
}

export function BookContextProvider({ value, children }: React.PropsWithChildren<Props>) {
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
