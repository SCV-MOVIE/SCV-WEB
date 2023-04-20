import { HeadCount } from '@/components/Modal/BookContext';

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
