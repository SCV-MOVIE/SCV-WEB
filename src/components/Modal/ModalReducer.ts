import React from 'react';
import SelectMovieBox from './SelectMovieBox';

export const enum BookStep {
  MOVIE = 1,
  INFOMATION,
  SEAT,
  PAY,
}

export const BookStepReducer: React.Reducer<BookStep, { direction: 'prev' | 'next' }> = (
  state,
  action,
) => {
  switch (action.direction) {
    case 'prev':
      return Math.max(state - 1, BookStep.MOVIE);
    case 'next':
      return Math.min(state + 1, BookStep.PAY);
    default:
      return state;
  }
};

export type BookStepDispatcher = React.Dispatch<{
  direction: 'next' | 'prev';
}>;

export const BookStepContent = {
  [BookStep.MOVIE]: SelectMovieBox,
  [BookStep.INFOMATION]: SelectMovieBox,
  [BookStep.SEAT]: SelectMovieBox,
  [BookStep.PAY]: SelectMovieBox,
} as const;
