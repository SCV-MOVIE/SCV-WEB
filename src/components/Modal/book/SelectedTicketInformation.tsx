import Image from 'next/image';
import { Divider, Grid, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { SelectedMovie } from './BookContext';
import { getSeatName, MemberShipPriceRate, salesTotalPrice, totalPrice } from '@root/src/utils';
import { TheaterType } from '@root/src/@types';

interface Props {
  selectedMovie: SelectedMovie;
  theaterType: TheaterType['value'];
}

function SelectedTicketInformation({ selectedMovie, theaterType }: Props) {
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
          <Image
            width={160}
            height={160}
            src={selectedMovie.movie.imgUrl || '/mario.jpeg'}
            alt="image-thumbnail"
          />
          <Heading as="h3" size="md">
            {selectedMovie.movie.name}
          </Heading>
          <Divider />
          <HStack alignItems="center">
            <Heading size="sm" fontSize={12}>
              상영관:
            </Heading>
            <Text size="sm" fontSize={12}>
              {selectedMovie.showTime.theaterName}
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
            <Text fontSize={12}>{selectedMovie.showTime.startDate.split(' ')[0]}</Text>
          </HStack>
          <HStack alignItems="center">
            <Heading fontSize={12}>상영시간: </Heading>
            <Text fontSize={12}>{selectedMovie.showTime.startDate.split(' ')[1]}</Text>
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
                  {seat}
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
            <Heading fontSize={12}>총 금액: </Heading>
            <Text fontSize={12}>
              {totalPrice(
                selectedMovie.headCount,
                selectedMovie.showTime.theaterType,
              ).toLocaleString()}
            </Text>
          </HStack>
          {selectedMovie.payment.partner?.name && (
            <HStack alignItems="center">
              <Heading fontSize={12}>할인 금액:</Heading>
              <Text fontSize={12} color="green.400">
                {selectedMovie.payment.partner.discount.toLocaleString()}
              </Text>
            </HStack>
          )}
          {selectedMovie.payment.membership && selectedMovie.payment.membership !== 'COMMON' && (
            <HStack alignItems="center">
              <Heading fontSize={12}>등급 할인 금액:</Heading>
              <Text fontSize={12} color="green.400">
                {(totalPrice(selectedMovie.headCount, theaterType) *
                  MemberShipPriceRate[selectedMovie.payment.membership]) /
                  100}
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
                totalPrice(selectedMovie.headCount, theaterType),
                Number(selectedMovie.payment.partner?.discount ?? 0) +
                  selectedMovie.payment.usedPoint,
                selectedMovie.payment.membership,
              ).toLocaleString()}
            </Text>
          </HStack>
        </>
      )}
    </Stack>
  );
}

export default SelectedTicketInformation;
