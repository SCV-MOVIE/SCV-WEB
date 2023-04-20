export const getSeatName = (row: number, targetIndex: number) => {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rowName = ALPHABET[Math.ceil(targetIndex / row) - 1];
  const columName = Math.ceil(targetIndex % row);

  return `${rowName}${columName === 0 ? row : columName}`;
};
