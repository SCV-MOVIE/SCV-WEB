import Image from 'next/image';
import { Divider, Grid, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { SelectedMovie } from './BookContext';
import { getSeatName, salesTotalPrice, totalPrice } from '@root/src/utils';

interface Props {
  selectedMovie: SelectedMovie;
}

function SelectedTicketInfomation({ selectedMovie }: Props) {
  return (
    <Stack
      justifyContent="center"
      textAlign="center"
      flex={1}
      flexShrink={0}
      minW={160}
      px={'12px'}
    >
      <Heading size="md" textAlign="center">
        예매정보
      </Heading>
      {selectedMovie.movie.id !== -1 && (
        <Stack>
          <Image width={160} height={160} src={selectedMovie.movie.imgUrl} alt="image-thumbnail" />
          <Heading as="h3" size="md">
            {selectedMovie.movie.name}
          </Heading>
          <Divider />
          <HStack alignItems="center">
            <Heading size="sm" fontSize={12}>
              상영관:
            </Heading>
            <Text size="sm" fontSize={12}>
              1관
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Heading fontSize={12}>상영등급: </Heading>
            <Text fontSize={12}>{selectedMovie.movie.rating}</Text>
          </HStack>
        </Stack>
      )}
      {selectedMovie.showTime.id !== -1 && (
        <>
          <HStack alignItems="center">
            <Heading fontSize={12}>날짜: </Heading>
            <Text fontSize={12}>
              {new Date().getMonth()}월 {new Date().getDay()}일
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Heading fontSize={12}>상영시간: </Heading>
            <Text fontSize={12}>17:10 ~ 19:53</Text>
          </HStack>
        </>
      )}
      {selectedMovie.selectedSeats.length && (
        <>
          <HStack alignItems="center">
            <Heading fontSize={12}>좌석번호: </Heading>

            <Grid templateColumns={`repeat(2, 1fr)`} columnGap={2}>
              {selectedMovie.selectedSeats.map((seat, idx) => (
                <Text key={seat} fontSize={12}>
                  {getSeatName(12, seat)}
                  {idx % 2 === 0 && ','}
                </Text>
              ))}
            </Grid>
          </HStack>
        </>
      )}
      {selectedMovie.payment.method && (
        <>
          <HStack alignItems="center">
            <Heading fontSize={12}>총금액: </Heading>
            <Text fontSize={12}>{totalPrice(selectedMovie.headCount).toLocaleString()}</Text>
          </HStack>
          {selectedMovie.payment.partner?.name && (
            <HStack alignItems="center">
              <Heading fontSize={12}>할인 금액:</Heading>
              <Text fontSize={12} color="green.400">
                {selectedMovie.payment.partner.discount.toLocaleString()}
              </Text>
            </HStack>
          )}
          {selectedMovie.payment.usedPoint > 0 && (
            <HStack alignItems="center">
              <Heading fontSize={12}>포인트 사용 금액:</Heading>
              <Text fontSize={12} color="green.400">
                {selectedMovie.payment.usedPoint.toLocaleString()}
              </Text>
            </HStack>
          )}
          <HStack alignItems="center">
            <Heading fontSize={12} fontWeight={800}>
              결제 금액:
            </Heading>
            <Text fontSize={12} color="red.400" fontWeight={800}>
              {salesTotalPrice(
                totalPrice(selectedMovie.headCount),
                selectedMovie.payment.partner?.discount,
              ).toLocaleString()}
            </Text>
          </HStack>
        </>
      )}
    </Stack>
  );
}

export default SelectedTicketInfomation;
