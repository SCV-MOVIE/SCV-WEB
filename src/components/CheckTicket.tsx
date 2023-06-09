import { Button, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import type { CheckTicket } from '../@types';

interface Props {
  color: 'white' | 'black';
  ticket?: CheckTicket;
  onClickPrint?: VoidFunction;
  onClickCancel?: VoidFunction;
}

function CheckTicketBox({ color, ticket, onClickPrint, onClickCancel }: Props) {
  const isDisabled =
    ticket?.status === 'CANCELLED' || ticket?.status === 'REJECTED' || ticket?.status === 'PRINTED';
  if (!ticket) {
    return null;
  }
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
        <Heading as="h3" size="md" color={color}>
          {ticket.movieName}
        </Heading>
        <Divider />
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            예약번호:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.reserveNm}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            상태:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.status}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            상영관:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.theaterName}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12} color={color}>
            날짜:{' '}
          </Heading>
          <Text fontSize={12} color={color}>
            {ticket.movieStartTime?.split(' ')[0]}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12} color={color}>
            상영시간:{' '}
          </Heading>
          <Text fontSize={12} color={color}>
            {ticket.movieStartTime?.split(' ')[1]}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            인원수:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.peopleNm}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            좌석번호:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.seatInfo}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            결제방법:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.paymentMethod}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            결제날짜:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.paymentDate}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            가격:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.price?.toLocaleString()}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12} color={color}>
            사용포인트:
          </Heading>
          <Text size="sm" fontSize={12} color={color}>
            {ticket.usedPoint?.toLocaleString()}
          </Text>
        </HStack>
      </Stack>
      <Stack w={320}>
        <Button onClick={!isDisabled ? onClickPrint : undefined} disabled={isDisabled}>
          출력하기
        </Button>
        <Button
          onClick={!isDisabled ? onClickCancel : undefined}
          disabled={isDisabled}
          colorScheme={'red'}
        >
          취소하기
        </Button>
      </Stack>
    </HStack>
  );
}

export default CheckTicketBox;
