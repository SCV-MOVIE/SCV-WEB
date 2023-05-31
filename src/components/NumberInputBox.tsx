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
  disabled?: boolean;
  onChange: UseCounterProps['onChange'];
}

function NumberInputBox({ label, value, disabled = false, onChange }: Props) {
  return (
    <Stack spacing={1}>
      <Text size="sm">{label}</Text>
      <NumberInput min={0} max={8} value={value} onChange={onChange} isDisabled={disabled}>
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
