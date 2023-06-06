import React from 'react';
import { Center, Divider, Heading, HStack, Stack } from '@chakra-ui/react';

import { HeadCount, useBookContext } from './BookContext';
import { NumberInputBox, SeatPicker } from '@/components';
import SelectedTicketInformation from './SelectedTicketInformation';
import { api } from '@root/src/api';

function SelectSeatBox() {
  const { value, setValue } = useBookContext();
  const size = value.showTime.theaterLayout.split('x');
  const [bookedSeats, setBookedSeats] = React.useState<string[]>([]);
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
    (seatId: string) => {
      setValue((prev) => ({
        ...prev,
        selectedSeats: value.selectedSeats.filter((seat) => seat !== seatId),
      }));
    },
    [setValue, value.selectedSeats],
  );

  const addSeat = React.useCallback(
    (seatId: string) => {
      setValue((prev) => ({ ...prev, selectedSeats: [...value.selectedSeats, seatId] }));
    },
    [value.selectedSeats, setValue],
  );

  React.useEffect(() => {
    (async () => {
      const result = await api.get(`/api/showtime/reservedSeat/list/${value.showTime.id}`);
      console.log(result);
      setBookedSeats(result.data);
    })();
  }, [value.showTime.id]);

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
          disabled={value.movie.rating === '18+'}
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
            row={Number(size[0])}
            column={Number(size[1])}
            occupied={bookedSeats}
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
