import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { Movie } from '@root/src/@types';
import { pretendard } from '@root/src/pages/_app';
import React from 'react';
import MovieDetailBox from './MovieDetailBox';

interface Props {
  isOpen: boolean;
  movie: Movie;
  onClose: VoidFunction;
}

function MovieModal({ isOpen, movie, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={500} className={pretendard.className}>
        <ModalHeader>{movie.name}</ModalHeader>
        <MovieDetailBox movie={movie} />
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}

export default MovieModal;
