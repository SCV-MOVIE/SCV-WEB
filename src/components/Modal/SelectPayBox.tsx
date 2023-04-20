import { Center, Divider, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Partner, Payment } from '@root/src/@types';
import React from 'react';

import { useBookContext } from './BookContext';
import SelectedTicketInfomation from './SelectedTicketInfomation';

const PAYMENT_METHOD = [
  { method: 'CARD', name: '카드 결제' },
  { method: 'ACCOUNT', name: '계좌 이체' },
  { method: 'POINT', name: '전액 포인트 결제' },
] as const;

const CARD_PARTNERS = [
  { discount: 1000, name: 'SCV-CARD1' },
  { discount: 2000, name: 'SCV-CARD2' },
  { discount: 2000, name: 'SCV-CARD3' },
  { discount: 1000, name: 'SCV-CARD4' },
] as const;

const MAX_POINT = 7320;

function SelectPayBox() {
  const { value, onChange } = useBookContext();

  const handleClickPaymentMethod = React.useCallback(
    (method: Payment['method']) => {
      if (method === 'CARD') {
        onChange((prev) => ({ ...prev, payment: { ...prev.payment, method } }));
      } else {
        onChange((prev) => ({
          ...prev,
          payment: { ...prev.payment, method, partner: { name: '', discount: 0 } },
        }));
      }
    },
    [onChange],
  );

  const handleClickPartner = React.useCallback(
    (partner: Partner) => {
      if (value.payment.partner?.name === partner.name) {
        onChange((prev) => ({
          ...prev,
          payment: { ...prev.payment, partner: { name: '', discount: 0 } },
        }));
      } else {
        onChange((prev) => ({ ...prev, payment: { ...prev.payment, partner } }));
      }
    },
    [onChange, value.payment.partner?.name],
  );

  const handleChangeInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let point = Number(e.target.value ?? 0);
      if (isNaN(point)) {
        point = 0;
      } else if (point > MAX_POINT) {
        point = MAX_POINT;
      }
      onChange((prev) => ({
        ...prev,
        payment: { ...prev.payment, usedPoint: point },
      }));
    },
    [onChange],
  );

  return (
    <HStack width="100%" alignItems="start">
      <Stack w="240px">
        <Center>
          <Heading size="md">결제 수단</Heading>
        </Center>
        <DividerStack spacing={0}>
          {PAYMENT_METHOD.map((payment) => (
            <ColorText
              key={payment.name}
              onClick={() => handleClickPaymentMethod(payment.method)}
              selected={payment.method === value.payment.method}
            >
              {payment.name}
            </ColorText>
          ))}
        </DividerStack>
      </Stack>
      <Divider orientation="vertical" h={320} alignSelf="center" color="gray.500" />
      <Stack w="240px">
        <Center>
          <Heading size="md">할인</Heading>
        </Center>
        <DividerStack spacing={0}>
          {value.payment.method === 'CARD' &&
            CARD_PARTNERS.map((partner) => (
              <ColorText
                key={partner.name}
                selected={partner.name === value.payment.partner?.name}
                onClick={() => handleClickPartner(partner)}
              >
                {partner.name}
                <Text as="span" color="red.400" ml={2}>
                  ({partner.discount.toLocaleString()} 할인)
                </Text>
              </ColorText>
            ))}
        </DividerStack>
      </Stack>
      <Divider orientation="vertical" h={320} alignSelf="center" color="gray.500" />
      <Stack w="320px">
        <Center>
          <Heading size="md">포인트 사용</Heading>
        </Center>
        <HStack></HStack>
        <Text>사용할 포인트</Text>
        <Input
          h={'24px'}
          borderRadius={2}
          placeholder={'0 원'}
          value={value.payment.usedPoint}
          onChange={handleChangeInput}
        />
        <Text fontSize={12} textAlign="end">
          사용가능한 포인트: {MAX_POINT.toLocaleString()}
        </Text>
      </Stack>
      <Divider orientation="vertical" h={320} alignSelf="center" color="gray.500" />
      <SelectedTicketInfomation selectedMovie={value} />
    </HStack>
  );
}

const DividerStack = styled(Stack)`
  & > p {
    padding-block: 16px;
  }

  & > p:nth-of-type(n + 2) {
    border-top: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  }
`;

type ColorTextStyleProps = { selected: boolean };
const ColorText = styled(Text)<ColorTextStyleProps>`
  color: ${({ theme, selected }) => (selected ? theme.colors.gray500 : theme.colors.gray300)};
  transition: all 0.15s ease-in;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export default SelectPayBox;
