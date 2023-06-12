import React from 'react';
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

import { pretendard } from '@root/src/pages/_app';
import { Theater } from '@root/src/@types';
import { SeatPicker } from '../SeatPicker';

interface Props {
  data: Theater;
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminTheaterLayoutModal({ data, isOpen, onClose }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const [row, column] = data.layout.split('x').map((elem) => parseInt(elem));

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>{data.name}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SeatPicker
            row={row}
            column={column}
            occupied={[]}
            selected={[]}
            maxReservableSeats={0}
            addSeat={() => {}}
            cancelSeat={() => {}}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default AdminTheaterLayoutModal;
