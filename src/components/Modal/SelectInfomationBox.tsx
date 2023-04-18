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

function SelectInfomationBox() {
  const [check, setCheck] = React.useState(false);

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
              <Td fontSize={12}>이름, 생년월일, 휴대폰번호</Td>
            </Tr>
          </Tbody>
        </Table>
        <ColorCheckBox
          checked={check}
          onClick={() => setCheck((prev) => !prev)}
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
          <Input placeholder="이름" width="100%" />
        </HStack>
        <HStack width="100%" spacing={12}>
          <Text size="sm" flexShrink={0} width="80px">
            생년월일
          </Text>
          <Input placeholder="생년월일" width="100%" />
        </HStack>
        <HStack width="100%" spacing={12}>
          <Text size="sm" flexShrink={0} width="80px">
            비밀번호
          </Text>
          <Input placeholder="비밀번호" width="100%" />
        </HStack>
        <HStack width="100%" spacing={12}>
          <Text size="sm" flexShrink={0} width="80px">
            비밀번호
          </Text>
          <Input placeholder="비밀번호" width="100%" />
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

export default SelectInfomationBox;
