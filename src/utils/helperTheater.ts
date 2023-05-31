import { HeadCount, SelectedMovie } from '@root/src/components/Modal/book/BookContext';
import { Movie, ShowTime, TheaterType, User } from '../@types';

const PRICE = {
  NORMAL: {
    ADULT: 10000,
    CHILD: 7000,
  },
  '3D': {
    ADULT: 11000,
    CHILD: 8000,
  },
  PREMIUM: {
    ADULT: 12000,
    CHILD: 9000,
  },
};

export const totalPrice = (headCount: HeadCount, theaterType: TheaterType['value']) => {
  let sum;

  sum = headCount.adult * PRICE[theaterType].ADULT;
  sum += headCount.child * PRICE[theaterType].CHILD;
  return sum;
};

export const membershipTotalPrice = (
  headCount: HeadCount,
  membership: User['membership'],
  theaterType: TheaterType['value'],
) => {
  const price = totalPrice(headCount, theaterType);
  if (!membership) {
    return price;
  }
  return (price * (100 - MemberShipPriceRate[membership])) / 100;
};

export const MemberShipPriceRate = {
  COMMON: 0,
  VIP: 5,
  VVIP: 10,
} as const;

export const salesTotalPrice = (
  totalPrice: number,
  discount: number | undefined,
  membership: User['membership'],
) => {
  if (membership == 'VIP' || membership == 'VVIP') {
    totalPrice = (totalPrice * (100 - MemberShipPriceRate[membership])) / 100;
  }
  if (typeof discount === 'undefined') {
    return totalPrice;
  }
  return Math.max(totalPrice - discount, 0);
};

export const pointFor = (
  inputPoint: number,
  value: SelectedMovie,
  maxPoint: number,
  membership: User['membership'],
  theaterType: TheaterType['value'],
) => {
  let point = inputPoint;
  const salePrice = salesTotalPrice(
    totalPrice(value.headCount, theaterType),
    value.payment.partner?.discount,
    membership,
  );
  if (isNaN(point)) {
    point = 0;
  } else if (point > Math.min(salePrice, maxPoint)) {
    point = Math.min(salePrice, maxPoint);
  }
  return point;
};

function addMinute(startDate: string, length: number) {
  // startDate를 Date 객체로 변환
  const startDatetime = new Date(startDate);

  // length 분을 밀리초로 변환
  const lengthMilliseconds = Number(length) * 60 * 1000;

  // startDate에 length를 더한 날짜/시간 계산
  const endDatetime = new Date(startDatetime.getTime() + lengthMilliseconds);

  // 결과를 원하는 형식으로 변환하여 반환
  const year = endDatetime.getFullYear();
  const month = String(endDatetime.getMonth() + 1).padStart(2, '0');
  const day = String(endDatetime.getDate()).padStart(2, '0');
  const hours = String(endDatetime.getHours()).padStart(2, '0');
  const minutes = String(endDatetime.getMinutes()).padStart(2, '0');
  const formattedEndDatetime = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedEndDatetime;
}

export const endTimeFor = (startTime: string, length: Movie['length']) => {
  return addMinute(startTime, Number(length));
};

export const moviesFromShowTimes = (showTimes: ShowTime[]) => {
  const movies = showTimes.map((showTime) => ({
    ...showTime.movie,
  }));
  return movies.filter(
    (item, index) => movies.findIndex((name) => name.name === item.name) === index,
  );
};

// { name: {day: { theaterName: showTimes[] }}}
export const formattedShowTimes = (showTimes: ShowTime[]) => {
  const nextShowTimes = showTimes
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .reduce(
      (acc, showTime) => {
        const day = showTime.startDate.split(' ')[0].slice(8, 10) as string;
        const theaterName = showTime.theaterName;

        return {
          ...acc,
          [showTime.movie.name]: {
            ...(acc[showTime.movie.name as keyof typeof acc] as object),
            [day]: {
              ...((acc[showTime.movie.name as keyof typeof acc][day] as object) ?? []),
              [theaterName]: [
                ...(acc[showTime.movie.name as keyof typeof acc][day]?.[theaterName] ?? []),
                showTime,
              ],
            },
          },
        };
      },
      moviesFromShowTimes(showTimes).reduce((acc, v) => {
        if (v.name in acc) {
          return acc;
        }
        return { ...acc, [v.name]: {} };
      }, {}),
    );

  return nextShowTimes;
};
