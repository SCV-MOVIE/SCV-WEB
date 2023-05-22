import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { pretendard } from '@root/src/pages/_app';
import React from 'react';
import FindIdBox from './FindIDBox';
import SignUpBox from './SignUpBox';

interface Props {
  type: 'findID' | 'findPW' | 'signUp';
  isOpen: boolean;
  onClose: VoidFunction;
}

const ModalContents: Record<Props['type'], { header: string; body: React.ReactElement }> = {
  findID: {
    header: '아이디 찾기',
    body: <FindIdBox />,
  },
  findPW: {
    header: '비밀번호 찾기',
    body: <SignUpBox />,
  },
  signUp: {
    header: '회원가입',
    body: <SignUpBox />,
  },
};

function UserUtilModal({ type, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={500} className={pretendard.className}>
        <ModalHeader>{ModalContents[type].header}</ModalHeader>
        {ModalContents[type].body}
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}

export default UserUtilModal;
