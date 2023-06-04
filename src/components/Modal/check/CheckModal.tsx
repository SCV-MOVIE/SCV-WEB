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
import type { CheckTicket, Information, Ticket } from '@root/src/@types';
import CheckTicketInformationBox from './CheckTicketInformationBox';
import PayedTicketInformationBox from './PayedTicketInformationBox';
import { DUMMY_CHECK_TICKET } from '@root/src/constants/dummy';
import { api } from '@root/src/api';
import { forPhoneNumber, forSecurityNumber } from '@root/src/utils';

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
    body: <PayedTicketInformationBox payedTicket={null} />,
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
  const [ticketInformation, setTicketInformation] = React.useState<CheckTicket | null>(null);

  const handleClose = () => {
    setTicketInformation(null);
    setStep('information');
    onClose();
  };

  const onInfoSubmit: SubmitHandler<Information> = async (data) => {
    try {
      const result = await api.get(`/api/ticket/check-by/info`, {
        data: {
          name: data.name,
          phoneNm: forPhoneNumber(data.phoneNumber),
          securityNm: forSecurityNumber(data.securityFrontNumber, data.securityBackNumber),
        },
      });
      console.log(result.data);
      setStep('complete');
      setTicketInformation(DUMMY_CHECK_TICKET);
    } catch (err) {
      alert(err);
    }
  };

  const onTicketSubmit: SubmitHandler<Pick<Ticket, 'reserveNumber'>> = async (data) => {
    try {
      const result = await api.get(`/api/ticket/check-by/reserveNm/${data.reserveNumber}`);
      console.log(result.data);
      setStep('complete');
      setTicketInformation(DUMMY_CHECK_TICKET);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={500} className={pretendard.className}>
        <ModalHeader>{ModalContents[step].header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {React.cloneElement(ModalContents[step].body, {
            payedTicket: ticketInformation,
            onInfoSubmit,
            onTicketSubmit,
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CheckModal;
