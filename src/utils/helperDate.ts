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
    return { kor: 'red.700', day: 'red.700' };
  }
  if (day === Day.SATURDAY) {
    return { kor: 'blue.700', day: 'blue.700' };
  }
  return { kor: 'gray.500', day: 'black' };
};

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export const getAge = (frontNumber: string) => {
  const HALF = '50';
  const target = frontNumber.slice(0, 2);
  const year = target > HALF ? Number(`19${target}`) : Number(`20${target}`);
  const birth = new Date(year, Number(frontNumber.slice(3, 4)), Number(frontNumber.slice(5, 6)));
  const today = new Date();
  return today.getFullYear() - birth.getFullYear() + 1;
};
