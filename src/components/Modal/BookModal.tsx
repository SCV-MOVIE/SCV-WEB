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
import { BookStep, BookStepContent, BookStepReducer, InitialStepValue } from './ModalReducer';
import { BookContextProvider, initialSelectedMovieValue, SelectedMovie } from './BookContext';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

function BookModal({ isOpen, onClose }: Props) {
  const [value, setValue] = React.useState<SelectedMovie>(initialSelectedMovieValue);
  const [state, dispatch] = React.useReducer(BookStepReducer, InitialStepValue);
  const ModalStepContent = BookStepContent[state.step];

  const onClickPrev = React.useCallback(() => dispatch({ direction: 'prev' }), []);
  const onClickNext = React.useCallback(() => dispatch({ direction: 'next' }), []);
  const onClickClose = React.useCallback(() => {
    dispatch({ direction: 'reset' });
    onClose();
  }, [onClose]);

  const onReset = React.useCallback(() => {
    dispatch({ direction: 'reset' });
    setValue(initialSelectedMovieValue);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <HStack
              position="absolute"
              left="0"
              cursor="pointer"
              alignItems="center"
              _hover={{ color: 'black', fontWeight: 800 }}
              onClick={onReset}
            >
              <Icon as={RefreshRight} />
              <Text fontSize={8} transition="all 0.2s">
                예매 다시하기
              </Text>
            </HStack>
            <Text>{state.title}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <BookContextProvider value={value} setValue={setValue}>
          <ModalBody>
            <ModalStepContent />
          </ModalBody>
        </BookContextProvider>
        <ModalFooter justifyContent={state.step !== BookStep.MOVIE ? 'space-between' : 'end'}>
          {state.step !== BookStep.MOVIE && (
            <Button colorScheme="gray" onClick={onClickPrev} borderRadius={0}>
              이전 단계
            </Button>
          )}
          {state.step !== BookStep.PAY ? (
            <Button colorScheme="blue" onClick={onClickNext} borderRadius={0}>
              다음 단계
            </Button>
          ) : (
            <Button colorScheme="red" onClick={onClickNext} borderRadius={0}>
              결제
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BookModal;
