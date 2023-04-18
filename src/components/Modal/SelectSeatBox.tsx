import React from 'react';
import { Divider, Heading, HStack, Stack } from '@chakra-ui/react';

import { HeadCount } from './BookContext';
import { NumberInputBox } from '@/components';
import SelectedTicketInfomation from './SelectedTicketInfomation';

function SelectSeatBox() {
  const [headCount, setHeadCount] = React.useState<HeadCount>({ adult: 0, child: 0 });

  const handleChangeNumberInput = React.useCallback(
    (value: string, type: keyof typeof headCount) => {
      const numberValue = Number(value);
      setHeadCount((prev) => ({ ...prev, [type]: numberValue }));
    },
    [],
  );

  return (
    <HStack spacing={2} alignItems="start">
      <Stack spacing={4} minW={160}>
        <Heading size="md" textAlign="center">
          인원선택
        </Heading>
        <NumberInputBox
          label="성인"
          value={headCount.adult}
          onChange={(value) => handleChangeNumberInput(value, 'adult')}
        />
        <NumberInputBox
          label="유아/청소년"
          value={headCount.child}
          onChange={(value) => handleChangeNumberInput(value, 'child')}
        />
      </Stack>
      <Divider orientation="vertical" height={240} color="gray.400" alignSelf="center" />
      <Stack spacing={4} flex={1}>
        <Heading size="md" textAlign="center">
          Screen
        </Heading>
      </Stack>
      <Divider orientation="vertical" height={240} color="gray.400" alignSelf="center" />
      <Stack spacing={4}>
        <SelectedTicketInfomation selectedMovie={null} />
      </Stack>
    </HStack>
  );
}

export default SelectSeatBox;
