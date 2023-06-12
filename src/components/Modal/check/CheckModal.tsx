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
import { api } from '@root/src/api';
import { forPhoneNumber, forSecurityNumber } from '@root/src/utils';
import CheckTicketBox from '../../CheckTicket';
import CheckTicketList from '../../CheckTicketList';
import { AxiosError } from 'axios';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

const ModalContents: Record<
  'information' | 'complete' | 'completeList',
  { header: string; body: React.ReactElement }
> = {
  complete: {
    header: '예매 정보 확인',
    body: <CheckTicketBox color={'black'} ticket={undefined} />,
  },
  completeList: {
    header: '예매 정보 확인',
    body: (
      <CheckTicketList
        color={'black'}
        tickets={[]}
        onClickPrint={() => {}}
        onClickCancel={() => {}}
      />
    ),
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
  const [ticketInformation, setTicketInformation] = React.useState<CheckTicket[] | null>(null);

  const handleClose = () => {
    setTicketInformation(null);
    setStep('information');
    onClose();
  };

  const onInfoSubmit: SubmitHandler<Information> = async (data) => {
    try {
      const result = await api.post(`/api/ticket/check-by/info`, {
        name: data.name,
        phoneNm: forPhoneNumber(data.phoneNumber),
        securityNm: forSecurityNumber(data.securityFrontNumber, data.securityBackNumber),
      });
      setStep('completeList');
      setTicketInformation(result.data);
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as { message: string };
      alert(data.message);
    }
  };

  const onTicketSubmit: SubmitHandler<Pick<Ticket, 'reserveNumber'>> = async (data) => {
    try {
      const result = await api.get(`/api/ticket/check-by/reserveNm/${data.reserveNumber}`);
      setStep('complete');
      setTicketInformation(result.data);
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as { message: string };
      alert(data.message);
    }
  };

  const handleClickPrint = async (id: number) => {
    await api.patch(`/api/ticket/print/${id}`);

    alert('발권이 완료되었습니다.');
  };

  const handleClickCancel = async (id: number) => {
    await api.patch(`/api/ticket/cancel/${id}`);

    alert('취소가 완료되었습니다.');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={500} className={pretendard.className}>
        <ModalHeader>{ModalContents[step].header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {React.cloneElement(ModalContents[step].body, {
            color: 'black',
            ticket: ticketInformation,
            tickets: ticketInformation,
            onInfoSubmit,
            onTicketSubmit,
            onClickPrint: handleClickPrint,
            onClickCancel: handleClickCancel,
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CheckModal;
