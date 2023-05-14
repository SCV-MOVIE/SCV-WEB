import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Divider, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';

import type { Information, Ticket } from '@root/src/@types';

interface Props {
  onInfoSubmit: (data: Information) => void;
  onTicketSubmit: (data: Pick<Ticket, 'reserveNumber'>) => void;
}

function CheckTicketInformationBox({ onInfoSubmit, onTicketSubmit }: Props) {
  const { register: ticketRegister, handleSubmit: handleTicketSubmit } = useForm<{
    reserveNumber: Ticket['reserveNumber'];
  }>();
  const { register: infoRegister, handleSubmit: handleInfoSubmit } = useForm<Information>();

  return (
    <HStack spacing={12} alignItems="start">
      <form onSubmit={handleTicketSubmit(onTicketSubmit)}>
        <Stack spacing={4}>
          <Heading size="md">예매번호로 조회</Heading>
          <HStack width="100%" spacing={12}>
            <Text size="sm" flexShrink={0} width="80px">
              예매번호
            </Text>
            <Input placeholder="예매번호" width="100%" {...ticketRegister('reserveNumber')} />
          </HStack>
          <Button type="submit" colorScheme={'green'}>
            조회하기
          </Button>
        </Stack>
      </form>
      <Divider orientation="vertical" height={240} color="gray.400" alignSelf="center" />
      <form onSubmit={handleInfoSubmit(onInfoSubmit)}>
        <Stack spacing={4}>
          <Heading size="md">예매자 정보 입력</Heading>
          <Text size="sm">
            예매내역 확인 및 취소 그리고 티켓 발권에 지장없도록 잘 확인하시어 정확히 입력해주시기
            바랍니다.
          </Text>
          <HStack width="100%" spacing={12}>
            <Text size="sm" flexShrink={0} width="80px">
              이름
            </Text>
            <Input placeholder="이름" width="100%" {...infoRegister('name')} />
          </HStack>
          <HStack width="100%" spacing={12}>
            <Text size="sm" flexShrink={0} width="80px">
              주민번호
            </Text>
            <HStack width="100%">
              <Input
                placeholder="앞자리(6)"
                {...infoRegister('securityFrontNumber')}
                maxLength={6}
                flex={1}
              />
              <Input
                type="password"
                placeholder="뒷자리(7)"
                {...infoRegister('securityBackNumber')}
                maxLength={7}
                flex={1}
              />
            </HStack>
          </HStack>
          <HStack width="100%" spacing={12}>
            <Text size="sm" flexShrink={0} width="80px">
              핸드폰 번호
            </Text>
            <Input
              placeholder="핸드폰 번호(01011112222)"
              {...infoRegister('phoneNumber')}
              flex={1}
              maxLength={11}
            />
          </HStack>
          <Button type="submit" colorScheme={'blue'}>
            조회하기
          </Button>
        </Stack>
      </form>
    </HStack>
  );
}

export default CheckTicketInformationBox;
