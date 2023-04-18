import React from 'react';
import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { RefreshRight } from '@root/public/icons';
import { BookStep, BookStepContent, BookStepReducer } from './ModalReducer';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

function BookModal({ isOpen, onClose }: Props) {
  const [step, dispatch] = React.useReducer(BookStepReducer, BookStep.MOVIE);
  const ModalStepContent = BookStepContent[step];

  const onClickPrev = () => dispatch({ direction: 'prev' });
  const onClickNext = () => dispatch({ direction: 'next' });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <HStack
              position="absolute"
              left="0"
              cursor="pointer"
              alignItems="center"
              _hover={{ color: 'black', fontWeight: 800 }}
            >
              <Icon as={RefreshRight} />
              <Text fontSize={8} transition="all 0.2s">
                예매 다시하기
              </Text>
            </HStack>
            <Text>영화 예매하기</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        {/* <BookContextProvider > */}
        <ModalBody>
          <ModalStepContent />
        </ModalBody>
        {/* </BookContextProvider> */}
        <ModalFooter justifyContent={step !== BookStep.MOVIE ? 'space-between' : 'end'}>
          {step !== BookStep.MOVIE && (
            <Button colorScheme="gray" onClick={onClickPrev} borderRadius={0}>
              이전 단계
            </Button>
          )}
          <Button colorScheme="blue" onClick={onClickNext} borderRadius={0}>
            다음 단계
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BookModal;
