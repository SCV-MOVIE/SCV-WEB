const enum Day {
  SUNDAY = 0,
  MONDAY,
  TUESEDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
export const korDay = (day: number) => {
  return daysOfWeek[day];
};

export const colorDay = (day: number) => {
  if (day === Day.SUNDAY) {
    return {kor: 'red.700', day: 'red.700'};
  }
  if (day === Day.SATURDAY) {
    return { kor: 'blue.700', day: 'blue.700' };
  }
  return { kor: 'gray.500', day: 'black' };
};
