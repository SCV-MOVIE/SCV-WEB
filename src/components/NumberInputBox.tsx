import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  UseCounterProps,
} from '@chakra-ui/react';

interface Props {
  label: string;
  value: number;
  onChange: UseCounterProps['onChange'];
}

function NumberInputBox({ label, value, onChange }: Props) {
  return (
    <Stack spacing={1}>
      <Text size="sm">{label}</Text>
      <NumberInput min={0} max={8} value={value} onChange={onChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  );
}

export default NumberInputBox;
