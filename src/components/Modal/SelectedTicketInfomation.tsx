import Image from 'next/image';
import { Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { Movie } from '@root/src/@types';

interface Props {
  selectedMovie: Movie;
}

function SelectedTicketInfomation({ selectedMovie }: Props) {
  return (
    <Stack justifyContent="center" textAlign="center" w="152px" px={'12px'}>
      <Heading size="md" textAlign="center">
        예매정보
      </Heading>
      {selectedMovie?.id !== -1 && (
        <Stack>
          <Image width={140} height={140} src={selectedMovie.imgUrl} alt="image-thumbnail" />
          <Heading as="h3" size="md">
            {selectedMovie.name}
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
            <Text fontSize={12}>{selectedMovie.rating}</Text>
          </HStack>
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
        </Stack>
      )}
    </Stack>
  );
}

export default SelectedTicketInfomation;
