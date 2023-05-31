import Head from 'next/head';
import styled from '@emotion/styled';
import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { BookModal, Bottom, CheckModal } from '@/components';
import { Film, Printer } from '@root/public/icons';
import { Partner } from '../@types';

export default function BookPage({ partners }: { partners: Partner[] }) {
  const { isOpen: isBookOpen, onOpen: onBookOpen, onClose: onBookClose } = useDisclosure();
  const {
    isOpen: isCheckingBookOpen,
    onOpen: onCheckingBookOpen,
    onClose: onCheckingBookClose,
  } = useDisclosure();

  return (
    <>
      <Head>
        <title>Create Next Apps</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Stack gap={4} mt={120}>
          <Text color="white" fontSize={'28px'}>
            안녕하세요 SCV-MOVIE입니다.
          </Text>
          <Text color="white" fontSize={'28px'}>
            오늘도 영화처럼
          </Text>
          <Text color="white" fontSize={'28px'}>
            좋은 하루 되세요!
          </Text>
        </Stack>
        <Center mt={12} width="100%">
          <HStack width="100%" margin="auto" spacing={0} justifyContent="space-between">
            <BookButton
              rightIcon={<Icon as={Film} boxSize={6} />}
              flex={1}
              cursor="pointer"
              borderLeftRadius={8}
              borderRightRadius={0}
              px={8}
              py={8}
              boxSizing="border-box"
              justifyContent="space-between"
              onClick={onBookOpen}
            >
              <Heading as="h2" fontSize={24}>
                예매하기
              </Heading>
            </BookButton>
            <Center width="2px">
              <Divider orientation="vertical" />
            </Center>
            <BookButton
              rightIcon={<Icon as={Printer} boxSize={6} />}
              flex={1}
              cursor="pointer"
              borderLeftRadius={0}
              borderRightRadius={8}
              px={8}
              py={8}
              justifyContent="space-between"
              onClick={onCheckingBookOpen}
            >
              <Heading as="h2" py={24} fontSize={24}>
                예매확인/취소
              </Heading>
            </BookButton>
          </HStack>
        </Center>
      </Content>
      <Bottom />
      <BookModal isOpen={isBookOpen} onClose={onBookClose} partners={partners} />
      <CheckModal isOpen={isCheckingBookOpen} onClose={onCheckingBookClose} />
    </>
  );
}

const Content = styled.div`
  display: block;
  padding-inline: 240px;

  ${({ theme }) =>
    `@media (max-width: ${theme.bp.mobile}) {
      padding-inline: 24px;
    }`}
`;

const BookButton = styled(Button)`
  & > span svg path,
  & > h2 {
    transition: all 0.2s ease-in;
  }

  &:hover {
    h2 {
      color: ${({ theme }) => theme.colors.green600};
    }

    & > span svg path {
      stroke: ${({ theme }) => theme.colors.green600};
    }
  }
`;
