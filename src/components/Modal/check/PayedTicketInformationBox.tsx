import React from 'react';
import Image from 'next/image';
import { Button, Divider, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';

import type { CheckTicket } from '@root/src/@types';
import MovieRating from '../../MovieRating';

interface Props {
  ticket: CheckTicket | null;
}

function PayedTicketInformationBox({ ticket }: Props) {
  return (
    <HStack spacing={12} alignItems="start">
      <Stack maxW={200}>
        <Image width={160} height={160} src={ticket?.movie.imgUrl ?? ''} alt="image-thumbnail" />
        <Heading as="h3" size="md">
          {ticket?.movie.name}
        </Heading>
        <Text size="sm" fontSize={12}>
          {ticket?.movie.introduction}
        </Text>
      </Stack>
      <Stack flex={1} gap={4}>
        <Heading size="md">영화 정보</Heading>
        <HStack alignItems="center">
          <Heading fontSize={12}>상영등급: </Heading>
          <MovieRating size={'md'} rating={ticket?.movie.rating ?? 'All'} />
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12}>러닝타임: </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.movie.length}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12}>장르: </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.movie.genres.map((genre) => genre.value).join(', ')}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12}>감독: </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.movie.director}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12}>배급사: </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.movie.distributor}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12}>배우: </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.movie.actors}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading fontSize={12}>제작진: </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.movie.staff}
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
            {ticket?.price.toLocaleString()}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            결제일:
          </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.paymentDate}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            사용 포인트:
          </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.usedPoint.toLocaleString()}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            예약 번호:
          </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.reserveNumber}
          </Text>
        </HStack>
        <HStack alignItems="center">
          <Heading size="sm" fontSize={12}>
            상태:
          </Heading>
          <Text size="sm" fontSize={12}>
            {ticket?.status}
          </Text>
        </HStack>
        <Button colorScheme="red">예매 취소</Button>
      </Stack>
    </HStack>
  );
}

export default PayedTicketInformationBox;
