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

const zeroPadding = (content: string | number, unit: number) =>
  content.toString().padStart(unit, '0');

export const runningTime = (startDate: Date, length: number) => {
  const endDate = new Date(startDate.getTime() + length * 60 * 1000);
  const startHour = zeroPadding(startDate.getHours(), 2);
  const startMinute = zeroPadding(startDate.getMinutes(), 2);
  const endHour = zeroPadding(endDate.getHours(), 2);
  const endMinute = zeroPadding(endDate.getMinutes(), 2);
  return `${startHour}:${startMinute} ~ ${endHour}:${endMinute}`;
};

export const getYYYYMMDD = (date: Date, separator = '') => {
  const YYYY = date.getFullYear();
  const MM = zeroPadding(date.getMonth() + 1, 2);
  const DD = zeroPadding(date.getDate(), 2);

  return [YYYY, MM, DD].join(separator);
};

export const getHHMM = (date: Date, separator = '') => {
  const HH = zeroPadding(date.getHours(), 2);
  const MM = zeroPadding(date.getMinutes(), 2);

  return [HH, MM].join(separator);
};
