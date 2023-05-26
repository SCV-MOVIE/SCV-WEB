import React from 'react';
import { Center, Divider, Heading, HStack, Stack } from '@chakra-ui/react';

import { HeadCount, useBookContext } from './BookContext';
import { NumberInputBox, SeatPicker } from '@/components';
import SelectedTicketInformation from './SelectedTicketInformation';

function SelectSeatBox() {
  const { value, setValue } = useBookContext();
  const maxReservableSeats =
    Number(value.headCount.child ?? 0) + Number(value.headCount.adult ?? 0);

  const handleChangeNumberInput = React.useCallback(
    (value: string, type: keyof HeadCount) => {
      const numberValue = Number(value);
      setValue((prev) => ({ ...prev, headCount: { ...prev.headCount, [type]: numberValue } }));
    },
    [setValue],
  );

  const cancelSeat = React.useCallback(
    (seatId: number) => {
      setValue((prev) => ({
        ...prev,
        selectedSeats: value.selectedSeats.filter((seat) => seat !== seatId),
      }));
    },
    [setValue, value.selectedSeats],
  );

  const addSeat = React.useCallback(
    (seatId: number) => {
      setValue((prev) => ({ ...prev, selectedSeats: [...value.selectedSeats, seatId] }));
    },
    [value.selectedSeats, setValue],
  );

  return (
    <HStack spacing={2} alignItems="start">
      <Stack spacing={4} minW={160}>
        <Heading size="md" textAlign="center">
          인원선택
        </Heading>
        <NumberInputBox
          label="성인"
          value={Number(value.headCount.adult ?? 0)}
          onChange={(value) => handleChangeNumberInput(value, 'adult')}
        />
        <NumberInputBox
          label="유아/청소년"
          value={Number(value.headCount.child ?? 0)}
          onChange={(value) => handleChangeNumberInput(value, 'child')}
        />
      </Stack>
      <Divider orientation="vertical" height={240} color="gray.400" alignSelf="center" />
      <Stack spacing={4} flex={1}>
        <Heading size="md" textAlign="center">
          Screen
        </Heading>
        <Center>
          <SeatPicker
            row={20}
            column={12}
            occupied={[4, 12, 17, 30, 50, 1]}
            selected={value.selectedSeats}
            maxReservableSeats={maxReservableSeats}
            addSeat={addSeat}
            cancelSeat={cancelSeat}
          />
        </Center>
      </Stack>
      <Divider orientation="vertical" height={240} color="gray.400" alignSelf="center" />
      <Stack spacing={4}>
        <SelectedTicketInformation selectedMovie={value} theaterType={value.showTime.theaterType} />
      </Stack>
    </HStack>
  );
}

export default SelectSeatBox;
