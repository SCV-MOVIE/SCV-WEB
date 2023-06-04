import { Center, Stack, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

import Logo from './Logo';

function Bottom() {
  const theme = useTheme();

  return (
    <Center gap={4} pt={120} pb={24}>
      <Logo width={100} height={100} />
      <Stack direction="column">
        <Text color={theme.colors.gray100} fontSize="md">
          서울시립대학교 데이터베이스 설계
        </Text>
        <Text color={theme.colors.gray100} fontSize="md">
          2018920039 이상민, 2017920049 이명재, 2018920051 임재욱
        </Text>
        <Text color={theme.colors.gray100} fontSize="md">
          영화 예매 사이트 구현
        </Text>
      </Stack>
    </Center>
  );
}

export default Bottom;
