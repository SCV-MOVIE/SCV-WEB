import React from 'react';
import Image from 'next/image';
import { Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import type { CheckTicket } from '@root/src/@types';
import { isEmptyValue } from '../../CheckTicket';

interface Props {
  payedTicket: CheckTicket | null;
}

function PayedTicketInformationBox({ payedTicket }: Props) {
  return (
    <HStack spacing={12} alignItems="start">
      <Stack maxW={240}>
        <Image
          width={240}
          height={500}
          src={
            isEmptyValue(payedTicket?.movieImgUrl ?? '')
              ? '/mario.jpeg'
              : payedTicket?.movieImgUrl ?? '/mario.jpeg'
          }
          alt="image-thumbnail"
        />
      </Stack>
      <Stack flex={1} gap={4}>
        <Heading size="md">영화 정보</Heading>
        <HStack alignItems="center">
          <Heading fontSize={12}>제목: </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.movieName}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12}>러닝타임: </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.movieLength.toLocaleString()}분
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12}>시작시간: </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.movieStartTime}
          </Text>
        </HStack>
      </Stack>
      <Stack flex={1} gap={4}>
        <Heading size="md">티켓 정보</Heading>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            가격:
          </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.price.toLocaleString()}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            결제 방법:
          </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.paymentMethod}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            결제일:
          </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.paymentDate}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            영화관:
          </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.theaterName}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            인원:
          </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.peopleNm} 명
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            좌석:
          </Heading>
          <Text size="sm" fontSize={12}>
            {payedTicket?.seatInfo}
          </Text>
        </HStack>
        <Button colorScheme="red">예매 취소</Button>
      </Stack>
    </HStack>
  );
}

export default PayedTicketInformationBox;
