import { Center, Divider, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Partner, Payment } from '@root/src/@types';
import { pointFor, salesTotalPrice, totalPrice } from '@root/src/utils';
import React from 'react';

import { useBookContext } from './BookContext';
import SelectedTicketInformation from './SelectedTicketInformation';

const PAYMENT_METHOD = [
  { method: 'CARD', name: '카드 결제' },
  { method: 'ACCOUNT', name: '계좌 이체' },
] as const;

const CARD_PARTNERS = [
  { discount: 1000, name: 'SCV-CARD1' },
  { discount: 2000, name: 'SCV-CARD2' },
  { discount: 2000, name: 'SCV-CARD3' },
  { discount: 1000, name: 'SCV-CARD4' },
] as const;

const MAX_POINT = 73212;

function SelectPayBox() {
  const { value, setValue } = useBookContext();
  const totalTicketPrice = React.useMemo(() => totalPrice(value.headCount), [value.headCount]);

  const handleClickPaymentMethod = React.useCallback(
    (method: Payment['method']) => {
      setValue((prev) => ({
        ...prev,
        payment: {
          ...prev.payment,
          method,
          partner: { name: '', discount: 0 },
        },
      }));
    },
    [setValue],
  );

  const handleClickPartner = React.useCallback(
    (partner: Partner) => {
      if (value.payment.partner?.name === partner.name) {
        setValue((prev) => ({
          ...prev,
          payment: { ...prev.payment, partner: { name: '', discount: 0 } },
        }));
      } else {
        setValue((prev) => ({
          ...prev,
          payment: {
            ...prev.payment,
            partner: {
              ...partner,
              discount: totalTicketPrice === prev.payment.usedPoint ? 0 : partner.discount,
            },
          },
        }));
      }
    },
    [setValue, totalTicketPrice, value.payment.partner?.name],
  );

  const handleClickMaxPoint = React.useCallback(() => {
    if (MAX_POINT <= 0) {
      return;
    }
    const usedPoint = Math.min(totalTicketPrice, MAX_POINT);
    setValue((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        method: usedPoint === totalTicketPrice ? 'POINT' : prev.payment.method,
        usedPoint: usedPoint,
      },
    }));
  }, [setValue, totalTicketPrice]);

  const handleChangeInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const usedPoint = pointFor(Number(e.target.value ?? 0), value, MAX_POINT);
      setValue((prev) => ({
        ...prev,
        payment: {
          ...prev.payment,
          usedPoint,
          method: usedPoint === totalTicketPrice ? 'POINT' : undefined,
        },
      }));
    },
    [setValue, totalTicketPrice, value],
  );

  return (
    <HStack width="100%" alignItems="start">
      <Stack w="320px">
        <Center>
          <Heading size="md">포인트 사용</Heading>
        </Center>
        <HStack justifyContent="space-between" alignItems="end">
          <Text>사용할 포인트</Text>
          <Text fontSize={12} onClick={handleClickMaxPoint} cursor="pointer" role="button">
            최대 사용
          </Text>
        </HStack>
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
      <Stack w="240px">
        <Center>
          <Heading size="md">결제 수단</Heading>
        </Center>
        <DividerStack spacing={0}>
          {PAYMENT_METHOD.map((payment) => (
            <ColorText
              key={payment.name}
              onClick={() =>
                value.payment.method === 'POINT' ? null : handleClickPaymentMethod(payment.method)
              }
              selected={payment.method === value.payment.method}
              disabled={totalTicketPrice === value.payment.usedPoint}
              aria-disabled={totalTicketPrice === value.payment.usedPoint}
              role="button"
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
                role="button"
                disabled={totalTicketPrice === value.payment.usedPoint}
                aria-disabled={totalTicketPrice === value.payment.usedPoint}
              >
                {partner.name}
                {partner.discount > 0 && (
                  <Text as="span" color="red.400" ml={2}>
                    ({partner.discount.toLocaleString()} 할인)
                  </Text>
                )}
              </ColorText>
            ))}
        </DividerStack>
      </Stack>
      <Divider orientation="vertical" h={320} alignSelf="center" color="gray.500" />
      <SelectedTicketInformation selectedMovie={value} />
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

type ColorTextStyleProps = { selected: boolean; disabled: boolean };
const ColorText = styled(Text)<ColorTextStyleProps>`
  color: ${({ theme, selected }) => (selected ? theme.colors.gray500 : theme.colors.gray300)};
  transition: all 0.15s ease-in;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:hover {
    color: ${({ disabled, theme }) => (disabled ? theme.colors.gray300 : theme.colors.gray500)};
  }
`;

export default SelectPayBox;