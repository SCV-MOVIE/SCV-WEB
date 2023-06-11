import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { pretendard } from '@root/src/pages/_app';
import React from 'react';
import ChangePWBox from './ChangePWBox';
import FindIdBox from './FindIDBox';
import FindPWBox from './FindPWBox';
import SignUpBox from './SignUpBox';
import UserDeleteBox from './UserDeleteBox';

interface Props {
  type: 'findID' | 'findPW' | 'signUp' | 'changePW' | 'delete';
  isOpen: boolean;
  onClose: VoidFunction;
}

const ModalContents: Record<Props['type'], { header: string; body: JSX.Element }> = {
  findID: {
    header: '아이디 찾기',
    body: <FindIdBox />,
  },
  findPW: {
    header: '비밀번호 찾기',
    body: <FindPWBox />,
  },
  signUp: {
    header: '회원가입',
    body: <SignUpBox onClose={() => alert('error')} />,
  },
  changePW: {
    header: '비밀번호 변경',
    body: <ChangePWBox />,
  },
  delete: {
    header: '회원 탈퇴하기',
    body: <UserDeleteBox />,
  },
};

function UserUtilModal({ type, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={500} className={pretendard.className}>
        <ModalHeader>{ModalContents[type].header}</ModalHeader>
        {React.cloneElement(ModalContents[type].body, { onClose })}
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}

export default UserUtilModal;
