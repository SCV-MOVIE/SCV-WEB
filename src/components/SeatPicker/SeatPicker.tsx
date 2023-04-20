import React from 'react';
import { Grid } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SeatBox from './SeatBox';
import { getSeatName } from '@root/src/utils';

interface Props {
  row: number;
  column: number;
  occupied: number[];
  selected: number[];
  maxReservableSeats: number;
  addSeat: (seatId: number) => void;
  cancelSeat: (seatId: number) => void;
}

function SeatPicker({
  row,
  column,
  occupied,
  selected,
  maxReservableSeats,
  addSeat,
  cancelSeat,
}: Props) {
  const seats = [...Array(row * column)].map((_, idx) => ({
    id: idx + 1,
    occupied: occupied.includes(idx + 1),
    selected: selected.includes(idx + 1),
    name: getSeatName(row, idx + 1),
  }));

  const onClickSeatBox = React.useCallback(
    (seatId: number) => {
      if (selected.includes(seatId)) {
        // 이미 있다면 삭제
        cancelSeat(seatId);
      } else {
        // 새로운 것이라면 최대 선택 가능한 값과 비교
        if (selected.length === maxReservableSeats) {
          return;
        }
        // 새로운 좌석 추가
        addSeat(seatId);
      }
    },
    [addSeat, cancelSeat, maxReservableSeats, selected],
  );

  return (
    <GridWithEmpty
      templateColumns={`repeat(${column}, 1fr)`}
      column={column}
      rowGap={0}
      columnGap={0}
    >
      {seats.map((seat) => (
        <SeatBox
          key={seat.id}
          id={seat.id}
          name={seat.name}
          selected={seat.selected}
          occupied={seat.occupied}
          onClick={onClickSeatBox}
        />
      ))}
    </GridWithEmpty>
  );
}

type StyleProps = Pick<Props, 'column'>;
const GridWithEmpty = styled(Grid)<StyleProps>`
  ${({ column }) => css`
    & button:nth-of-type(${column}n + 2) {
      margin-right: 40px;
    }

    & button:nth-of-type(${column}n + ${column - 2}) {
      margin-right: 40px;
    }
  `}
`;

export default SeatPicker;
