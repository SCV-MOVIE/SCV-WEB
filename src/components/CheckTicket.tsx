import { Button, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { CheckTicket } from '../@types';

interface Props {
  ticket: CheckTicket;
  onClickPrint?: VoidFunction;
}

function CheckTicket({ ticket, onClickPrint }: Props) {
  return (
    <HStack gap={12}>
      <Image
        width={160}
        height={160}
        // src={selectedMovie.movie.imgUrl}
        src={'/mario.jpeg'}
        alt="image-thumbnail"
      />
      <Stack>
        <Heading as="h3" size="md" color="white">
          {ticket.movieName}
        </Heading>
        <Divider />
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            예약번호:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.reserveNm}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            상태:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.status}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            상영관:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.theaterName}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12} color="white">
            날짜:{' '}
          </Heading>
          <Text fontSize={12} color="white">
            {ticket.movieStartTime.split(' ')[0]}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12} color="white">
            상영시간:{' '}
          </Heading>
          <Text fontSize={12} color="white">
            {ticket.movieStartTime.split(' ')[1]}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            인원수:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.peopleNm}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            좌석번호:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.seatInfo}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            결제방법:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.paymentMethod}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            결제날짜:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.paymentDate}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            가격:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.price.toLocaleString()}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color="white">
            사용포인트:
          </Heading>
          <Text size="sm" fontSize={12} color="white">
            {ticket.usedPoint.toLocaleString()}
          </Text>
        </HStack>
      </Stack>
      <Button onClick={onClickPrint}>출력하기</Button>
    </HStack>
  );
}

export default CheckTicket;
