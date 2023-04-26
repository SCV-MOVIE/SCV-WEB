import {
  Checkbox,
  Divider,
  Heading,
  HStack,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SelectedMovie, useBookContext } from './BookContext';

interface Information {
  name: string;
  phoneNumber: string;
  securityFrontNumber: string;
  securityBackNumber: string;
}

function SelectInformationBox() {
  const { value, setValue } = useBookContext();
  const { control } = useForm<Information>();

  const handleChangeInput = React.useCallback(
    (type: keyof SelectedMovie['information'], value: string) => {
      setValue((prev) => ({
        ...prev,
        information: {
          ...prev.information,
          [type]: value,
        },
      }));
    },
    [setValue],
  );

  return (
    <HStack spacing={12} alignItems="start">
      <Stack spacing={4}>
        <Heading size="md">개인정보활용동의</Heading>
        <Text size="sm">
          SCV-MOVIE 예매서비스 제공을 위해 필요한 최소한의 개인정보이므로 입력(수집)에 동의하지 않을
          경우 서비스를 이용하실 수 없습니다.
        </Text>
        <Table>
          <Tbody>
            <Tr>
              <Td fontSize={12} bgColor="gray.200" fontWeight="bold">
                수집목적
              </Td>
              <Td fontSize={12}>영화 예매서비스 제공</Td>
            </Tr>
            <Tr>
              <Td fontSize={12} bgColor="gray.200" fontWeight="bold">
                제3자 정보 제공
              </Td>
              <Td fontSize={12}>㈜SCV-MOVIE</Td>
            </Tr>
            <Tr>
              <Td fontSize={12} bgColor="gray.200" fontWeight="bold">
                보유기간
              </Td>
              <Td fontSize={12}>예매 후 6개월</Td>
            </Tr>
            <Tr>
              <Td fontSize={12} bgColor="gray.200" fontWeight="bold">
                수집항목
              </Td>
              <Td fontSize={12}>이름, 주민번호, 휴대폰번호</Td>
            </Tr>
          </Tbody>
        </Table>
        <ColorCheckBox
          checked={value.information.agree}
          onChange={() =>
            setValue((prev) => ({
              ...prev,
              information: { ...prev.information, agree: !prev.information.agree },
            }))
          }
          justifyContent="end"
        >
          개인정보수집에 동의합니다.
        </ColorCheckBox>
      </Stack>
      <Divider orientation="vertical" height={240} color="gray.400" alignSelf="center" />
      <Stack spacing={4}>
        <Heading size="md">개인정보입력</Heading>
        <Text size="sm">
          예매내역 확인 및 취소 그리고 티켓 발권에 지장없도록 잘 확인하시어 정확히 입력해주시기
          바랍니다.
        </Text>
        <HStack width="100%" spacing={12}>
          <Text size="sm" flexShrink={0} width="80px">
            이름
          </Text>
          <Controller
            control={control}
            name="name"
            defaultValue={value.information.name}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="이름"
                width="100%"
                onChange={(e) => {
                  handleChangeInput('name', e.target.value);
                  onChange(e.target.value);
                }}
              />
            )}
          />
        </HStack>
        <HStack width="100%" spacing={12}>
          <Text size="sm" flexShrink={0} width="80px">
            주민번호
          </Text>
          <HStack>
            <Controller
              control={control}
              name="securityFrontNumber"
              defaultValue={value.information.securityFrontNumber}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="앞자리(6)"
                  flex={1}
                  maxLength={6}
                  onChange={(e) => {
                    handleChangeInput('securityFrontNumber', e.target.value);
                    onChange(e.target.value);
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="securityBackNumber"
              defaultValue={value.information.securityBackNumber}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  value={value}
                  placeholder="뒷자리(7)"
                  flex={1}
                  maxLength={7}
                  onChange={(e) => {
                    handleChangeInput('securityBackNumber', e.target.value);
                    onChange(e.target.value);
                  }}
                />
              )}
            />
          </HStack>
        </HStack>
        <HStack width="100%" spacing={12}>
          <Text size="sm" flexShrink={0} width="80px">
            핸드폰 번호
          </Text>
          <Controller
            control={control}
            name="phoneNumber"
            defaultValue={value.information.phoneNumber}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="핸드폰 번호(01011112222)"
                flex={1}
                maxLength={11}
                onChange={(e) => {
                  handleChangeInput('phoneNumber', e.target.value);
                  onChange(e.target.value);
                }}
              />
            )}
          />
        </HStack>
      </Stack>
    </HStack>
  );
}

const ColorCheckBox = styled(Checkbox)`
  input + span {
    color: ${({ theme }) => theme.colors.gray200};
  }
`;

export default SelectInformationBox;
