import { Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface Props {
  title: string;
}

function LinedTitle({ title }: Props) {
  return (
    <>
      <Heading as="h1" size="3xl" color="white" marginBottom={4}>
        {title}
      </Heading>
      <Line />
    </>
  );
}

const Line = styled.div`
  width: 80px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.blue400};
`;

export default LinedTitle;
