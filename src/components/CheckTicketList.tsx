import { Button, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import type { CheckTicket } from '../@types';
import CheckTicketBox from './CheckTicket';

interface Props {
  color: 'white' | 'black';
  tickets: CheckTicket[];
  onClickPrint: (id: number) => void;
}

function CheckTicketList({ color, tickets, onClickPrint }: Props) {
  return (
    <>
      {tickets?.map((ticket) => (
        <CheckTicketBox
          key={ticket.ticketId}
          color={color}
          ticket={ticket}
          onClickPrint={() => onClickPrint(ticket.ticketId)}
        />
      ))}
      ;
    </>
  );
}

export default CheckTicketList;
