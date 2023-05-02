import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { pretendard } from '@root/src/pages/_app';
import type { Information, Ticket } from '@root/src/@types';
import CheckTicketInformationBox from './CheckTicketInformationBox';
import PayedTicketInformationBox from './PayedTicketInformationBox';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

const ModalContents: Record<
  'information' | 'complete',
  { header: string; body: React.ReactElement }
> = {
  complete: {
    header: '예매 정보 확인',
    body: <PayedTicketInformationBox ticket={null} />,
  },
  information: {
    header: '예매 정보 입력',
    body: (
      <CheckTicketInformationBox
        onInfoSubmit={() => {
          alert('no props ');
        }}
        onTicketSubmit={() => {
          alert('no props ');
        }}
      />
    ),
  },
};

function CheckModal({ isOpen, onClose }: Props) {
  const [step, setStep] = React.useState<keyof typeof ModalContents>('information');
  const [ticketInformation, setTicketInformation] = React.useState<Ticket | null>(null);

  const onInfoSubmit: SubmitHandler<Information> = async (data) => {
    console.log(data);
    //TODO: 백엔드 데이터 조회
    setStep('complete');
  };
  const onTicketSubmit: SubmitHandler<Pick<Ticket, 'reserveNumber'>> = async (data) => {
    console.log(data);
    setStep('complete');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={500} className={pretendard.className}>
        <ModalHeader>{ModalContents[step].header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {React.cloneElement(ModalContents[step].body, {
            ticket: ticketInformation,
            onInfoSubmit,
            onTicketSubmit,
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CheckModal;
