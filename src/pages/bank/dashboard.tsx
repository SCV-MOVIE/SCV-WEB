import Head from 'next/head';
import styled from '@emotion/styled';
import BankTable from '@root/src/components/bank/BankTable';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '@root/src/utils';
import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { CreditCard, LeftArrow, RightArrow, Timelapse } from '@root/public/icons';
import React, { CSSProperties } from 'react';
import { BankDashBoard } from '@root/src/@types';

const dummyData: BankDashBoard[] = [
  {
    id: 4,
    method: 'Bank',
    from: 'SCV 123456-00-123456',
    to: 'SCV 123456-00-345678',
    amount: 45000,
    updatedAt: null,
    approveNm: null,
  },
  {
    id: 3,
    method: 'Bank',
    from: 'SCV 123456-00-123456',
    to: 'SCV 123456-00-345678',
    amount: 45000,
    updatedAt: null,
    approveNm: null,
  },
  {
    id: 2,
    method: 'Card',
    from: 'SCV 123456-00-123456',
    to: 'SCV 123456-00-345678',
    amount: 45000,
    updatedAt: new Date('2020.12.24 13:16:04'),
    approveNm: '1234568',
  },
  {
    id: 1,
    method: 'Bank',
    from: 'SCV 123456-00-123456',
    to: 'SCV 123456-00-345678',
    amount: 45000,
    updatedAt: new Date('2020.12.24 11:16:02'),
    approveNm: '1234567',
  },
];

const columnHelper = createColumnHelper<BankDashBoard>();

const bankColumns = [
  columnHelper.accessor((row) => row.method, {
    id: 'method',
    cell: (info) => <MethodCell method={info.getValue()} />,
    header: () => <span>Method</span>,
  }),
  columnHelper.accessor((row) => row.from, {
    id: 'from',
    cell: (info) => info.getValue(),
    header: () => <span>From</span>,
  }),
  columnHelper.accessor((row) => row.to, {
    id: 'to',
    cell: (info) => info.getValue(),
    header: () => <span>To</span>,
  }),
  columnHelper.accessor((row) => row.amount, {
    id: 'amount',
    cell: (info) => <Right>{info.getValue().toLocaleString('ko-KR')}원</Right>,
    header: () => <Right>Amount</Right>,
  }),
  columnHelper.accessor((row) => row.updatedAt, {
    id: 'date',
    cell: (info) => <DateCell updatedAt={info.getValue()} />,
    header: () => <span>Date</span>,
  }),
  columnHelper.accessor((row) => row.approveNm, {
    id: 'approveNm',
    cell: (info) => info.getValue(),
    header: () => <span>Approve Num.</span>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => <RejectButton id={info.getValue()} />,
    header: () => <></>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => <ApproveButton id={info.getValue()} />,
    header: () => <></>,
  }),
];

export default function BankPage() {
  const theme = useTheme();
  const [pageNum, setPageNum] = React.useState(1);
  const navigateNum = pageNum - (pageNum % 4 === 0 ? 4 : pageNum % 4) + 1;
  const navigateArr = new Array(4).fill(0).map((_, idx) => navigateNum + idx);

  const handleClickPrevNav = () => {
    setPageNum((prev) => Math.max(prev - 1, 1));
  };

  const handleClickNextNav = () => {
    setPageNum((prev) => prev + 1);
  };

  const handleClickNumNav = (num: number) => {
    setPageNum(num);
  };
  return (
    <>
      <Head>
        <title>Bank</title>
        <meta name="description" content="SCV Bank Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <BankTable columns={bankColumns} data={dummyData} />
        <BankBottom>
          <HStack>
            <NavigateButton onClick={handleClickPrevNav}>
              <Icon width={6} height={6} fill={theme.colors.gray300} as={LeftArrow} />
            </NavigateButton>
            {navigateArr.map((id) => (
              <NavigateButton
                key={id}
                selected={pageNum === id}
                onClick={() => handleClickNumNav(id)}
              >
                {id}
              </NavigateButton>
            ))}
            <NavigateButton onClick={handleClickNextNav}>
              <Icon width={6} height={6} fill={theme.colors.gray300} as={RightArrow} />
            </NavigateButton>
          </HStack>
        </BankBottom>
      </Content>
    </>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: 'bank',
    title: 'Dashboard',
  },
});

const MethodCell = ({ method }: Pick<BankDashBoard, 'method'>) => {
  return (
    <Flex gap="1rem" alignItems="center">
      {method === 'Bank' ? (
        <Icon fontSize="lg" as={Timelapse} />
      ) : (
        <Icon fontSize="lg" as={CreditCard} />
      )}
      {method}
    </Flex>
  );
};

const DateCell = ({ updatedAt }: Pick<BankDashBoard, 'updatedAt'>) => {
  const theme = useTheme();
  const formattedData = updatedAt ? dateFormatter.format(updatedAt!) : null;
  const [dateNoTime, time] = formattedData?.split(',') ?? ['', ''];
  const [hour, minute] = time.split(':') ?? ['', ''];
  const isPM = Number(hour) >= 12;
  return (
    <Flex flexDirection="column" justifyContent="center">
      {updatedAt ? (
        <>
          <BankDate>{dateNoTime.replace(/\//g, '.')}</BankDate>
          <BankTime fontSize="sm" color={theme.colors.gray300}>
            {`${isPM ? Number(hour) - 12 : hour}:${minute}`} {isPM ? 'PM' : 'AM'}
          </BankTime>
        </>
      ) : (
        '-'
      )}
    </Flex>
  );
};

const ApproveButton = ({ id }: Pick<BankDashBoard, 'id'>) => {
  const handleClickButton = () => {
    console.log(id);
  };
  return (
    <BankButton onClick={handleClickButton} isApprove>
      승인
    </BankButton>
  );
};

const RejectButton = ({ id }: Pick<BankDashBoard, 'id'>) => {
  const handleClickButton = () => {
    console.log(id);
  };
  return (
    <BankButton onClick={handleClickButton} isReject>
      거절
    </BankButton>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  width: 100%;
  height: 100%;

  padding: 1rem 2rem 5rem 2rem;
`;

const BankBottom = styled.div`
  width: 100%;
  height: 3rem;

  display: flex;
  justify-content: flex-end;
`;

const BankDate = styled.span``;

const BankTime = styled(Text)``;

const Right = styled.span`
  display: block;
  width: 100%;
  text-align: right;
`;

type NavigateButtonProps = CSSProperties & {
  disabled?: boolean;
  selected?: boolean;
};
const NavigateButton = styled.button<NavigateButtonProps>`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid;
  border-color: ${({ theme, selected }) => (selected ? 'none' : theme.colors.gray100)};
  border-radius: 0.5rem;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);

  color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.black)};
  background-color: ${({ theme, selected }) => (selected ? theme.colors.approve : 'none')};
`;

type BankButtonProps = CSSProperties & {
  isApprove?: boolean;
  isReject?: boolean;
};
const BankButton = styled.button<BankButtonProps>`
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.75rem;

  font-size: small;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, isApprove, isReject }) =>
    isApprove ? theme.colors.approve : isReject ? theme.colors.reject : 'none'};
`;
