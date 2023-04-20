export const getSeatName = (column: number, targetIndex: number) => {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rowName = ALPHABET[Math.ceil(targetIndex / column) - 1];
  const columName = Math.ceil(targetIndex % column);

  return `${rowName}${columName === 0 ? column : columName}`;
};
