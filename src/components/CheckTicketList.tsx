import { Stack } from '@chakra-ui/react';
import type { CheckTicket } from '../@types';
import CheckTicketBox from './CheckTicket';

interface Props {
  color: 'white' | 'black';
  tickets: CheckTicket[];
  onClickPrint: (id: number) => void;
  onClickCancel: (id: number) => void;
}

function CheckTicketList({ color, tickets, onClickPrint, onClickCancel }: Props) {
  return (
    <>
      <Stack gap={16}>
        {tickets
          .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
          ?.map((ticket) => (
            <CheckTicketBox
              key={ticket.ticketId}
              color={color}
              ticket={ticket}
              onClickPrint={() => onClickPrint(ticket.ticketId)}
              onClickCancel={() => onClickCancel(ticket.ticketId)}
            />
          ))}
      </Stack>
    </>
  );
}

export default CheckTicketList;
