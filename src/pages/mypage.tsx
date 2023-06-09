import Head from 'next/head';
import styled from '@emotion/styled';
import Image from 'next/image';
import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Bottom, NavBar, UserUtilModal } from '@/components';
import { useUserInfo } from '../hooks';
import React from 'react';
import { api } from '../api';
import type { CheckTicket } from '../@types';
import CheckTicketBox from '../components/CheckTicket';

export default function MyPage() {
  const { user } = useUserInfo();
  const [tickets, setTickets] = React.useState<CheckTicket[]>([]);
  const {
    isOpen: isChangePWOpen,
    onOpen: onChangePWOpen,
    onClose: onChangePWClose,
  } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  React.useEffect(() => {
    (async () => {
      if (user?.id) {
        const result = await api.get<CheckTicket[]>('/api/ticket/list');
        setTickets(
          result.data.sort(
            (a, b) =>
              new Date(a.paymentDate).getMilliseconds() - new Date(b.paymentDate).getMilliseconds(),
          ),
        );
      }
    })();
  }, [user?.id]);

  const handleClickPrint = async (id: number) => {
    await api.patch(`/api/ticket/print/${id}`);

    alert('발권이 완료되었습니다.');
  };

  const handleClickCancel = async (id: number) => {
    await api.patch(`/api/ticket/cancel/${id}`);

    alert('취소가 완료되었습니다.');
  };

  return (
    <>
      <Head>
        <title>Create Next Apps</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Content>
        <Center>
          <Tabs minW={980}>
            <TabList color="white">
              <Tab>내정보</Tab>
              <Tab>티켓 조회</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack>
                  <HStack gap={16}>
                    <Text color="white">이름</Text>
                    <Text color="white">{user?.name}</Text>
                  </HStack>
                  <HStack gap={16}>
                    <Text color="white">아이디</Text>
                    <Text color="white">{user?.loginId}</Text>
                  </HStack>

                  <HStack gap={16}>
                    <Text color="white">핸드폰 번호</Text>
                    <Text color="white">{user?.phoneNm}</Text>
                  </HStack>
                  <HStack gap={16}>
                    <Text color="white">포인트</Text>
                    <Text color="white">{user?.point.toLocaleString()}</Text>
                  </HStack>
                  <Button color="blue" onClick={onChangePWOpen}>
                    비밀번호 변경
                  </Button>
                  <Button colorScheme="red" onClick={onDeleteOpen}>
                    회원 탈퇴
                  </Button>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack>
                  {tickets.map((ticket) => (
                    <CheckTicketBox
                      key={ticket.ticketId}
                      color={'white'}
                      ticket={ticket}
                      onClickPrint={() => handleClickPrint(ticket.ticketId)}
                      onClickCancel={() => handleClickCancel(ticket.ticketId)}
                    />
                  ))}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Content>
      <UserUtilModal type={'changePW'} isOpen={isChangePWOpen} onClose={onChangePWClose} />
      <UserUtilModal type={'delete'} isOpen={isDeleteOpen} onClose={onDeleteClose} />
      <Bottom />
    </>
  );
}

const Content = styled.div`
  padding-inline: 240px;
  background-color: #222;
  min-height: 80vh;

  ${({ theme }) =>
    `@media (max-width: ${theme.bp.mobile}) {
      padding-inline: 24px;
    }`};
`;
