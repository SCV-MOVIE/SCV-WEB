import { Center, Stack, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

import Logo from './Logo';

function Bottom() {
  const theme = useTheme();

  return (
    <Center gap={24} marginBlock={40}>
      <Logo width={100} height={100} />
      <Stack direction="column" gap={4}>
        <Text color={theme.colors.gray100} fontSize="md">
          서울시립대학교 데이터베이스 설계
        </Text>
        <Text color={theme.colors.gray100} fontSize="md">
          2018920039 이상민, 2017920049 이명재, 20189200 임재욱
        </Text>
        <Text color={theme.colors.gray100} fontSize="md">
          영화 예매 사이트 구현
        </Text>
      </Stack>
    </Center>
  );
}

export default Bottom;
