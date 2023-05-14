import { HeadCount, SelectedMovie } from '@root/src/components/Modal/book/BookContext';

const ADULT_PRICE = 10000;
const CHILD_PRICE = 7000;

export const totalPrice = (headCount: HeadCount) => {
  let sum;

  sum = headCount.adult * ADULT_PRICE;
  sum += headCount.child * CHILD_PRICE;
  return sum;
}

export const salesTotalPrice = (totalPrice: number, discount: number | undefined) => {
  if (typeof discount === 'undefined') {
    return totalPrice;
  }
  return Math.max(totalPrice - discount, 0);
}

export const pointFor = (inputPoint: number, value: SelectedMovie, maxPoint: number) => {
  let point = inputPoint;
  const salePrice = salesTotalPrice(totalPrice(value.headCount), value.payment.partner?.discount);
  if (isNaN(point)) {
    point = 0;
  } else if (point > Math.min(salePrice, maxPoint)) {
    point = Math.min(salePrice, maxPoint);
  }
  return point;
}
