import React from 'react';
import SelectInfomationBox from './SelectInfomationBox';
import SelectMovieBox from './SelectMovieBox';
import SelectPayBox from './SelectPayBox';
import SelectSeatBox from './SelectSeatBox';

export const enum BookStep {
  MOVIE = 1,
  INFOMATION,
  SEAT,
  PAY,
}

export interface BookStepType {
  step: BookStep;
  title: string;
}

export const BookStepTitle = {
  [BookStep.MOVIE]: '영화 예매',
  [BookStep.INFOMATION]: '예매자 정보',
  [BookStep.SEAT]: '좌석 선택',
  [BookStep.PAY]: '결제 선택',
} as const;

export const InitialStepValue = {
  step: BookStep.MOVIE,
  title: BookStepTitle[BookStep.MOVIE],
} as const;

export const BookStepReducer: React.Reducer<BookStepType, { direction: 'prev' | 'next' | 'reset' }> = (
  state,
  action,
) => {
  switch (action.direction) {
    case 'prev':
      const prevStep: BookStep = Math.max(state.step - 1, BookStep.MOVIE);
      return { step: prevStep, title: BookStepTitle[prevStep] };
    case 'next':
      const nextStep: BookStep = Math.min(state.step + 1, BookStep.PAY);
      return { step: nextStep, title: BookStepTitle[nextStep] };
    case 'reset':
      const resetStep = BookStep.MOVIE;
      return { step: resetStep, title: BookStepTitle[resetStep] };
    default:
      return state;
  }
};

export type BookStepDispatcher = React.Dispatch<{
  direction: 'next' | 'prev' | 'reset';
}>;

export const BookStepContent = {
  [BookStep.MOVIE]: SelectMovieBox,
  [BookStep.INFOMATION]: SelectInfomationBox,
  [BookStep.SEAT]: SelectSeatBox,
  [BookStep.PAY]: SelectPayBox,
} as const;
