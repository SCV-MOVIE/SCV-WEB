import { Button, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

interface Props {
  id: number;
  name: string;
  occupied: boolean;
  selected: boolean;
  onClick: (seatId: number) => void;
}

function SeatBox(props: Props) {
  const { id, name, occupied, selected, onClick, ...restProps } = props;

  return (
    <Wrapper
      occupied={occupied}
      disabled={occupied}
      selected={selected}
      aria-disabled={occupied}
      justifyContent="center"
      onClick={() => (occupied ? null : onClick(id))}
      {...restProps}
    >
      <Text fontSize={14} color="white">
        {name}
      </Text>
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'occupied' | 'selected'>;
const Wrapper = styled(Button)<StyleProps>`
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: relative;
  margin: 1px;
  padding: 0;
  border-radius: 0;
  border: ${({ theme }) => `1px solid ${theme.colors.black}`};
  border-collapse: separate;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.coreBlue : theme.colors.coreGreen};
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.colors.blue600 : theme.colors.green600};
  }

  &[aria-disabled='true'] {
    background-color: ${({ theme }) => theme.colors.gray500};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.green100};
    opacity: 1;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray500};
    }
  }
`;

export default SeatBox;
