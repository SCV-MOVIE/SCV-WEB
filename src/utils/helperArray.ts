export const arrayDivision = (arr: any, n: number) => {
  const length = arr.length;
  const divide = Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
  const newArray = [];

  for (let i = 0; i <= divide; i++) {
    newArray.push(arr.splice(0, n));
  }

  return newArray;
};
