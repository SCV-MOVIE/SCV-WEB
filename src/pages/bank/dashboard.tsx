import Head from 'next/head';
import styled from '@emotion/styled';
import BankTable from '@root/src/components/bank/BankTable';
import { createColumnHelper } from '@tanstack/react-table';
import { arrayDivision, dateFormatter } from '@root/src/utils';
import { Flex, HStack, Icon, Tag, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { CreditCard, LeftArrow, RightArrow, Timelapse } from '@root/public/icons';
import React, { CSSProperties } from 'react';
import { BankRequest } from '@root/src/@types';
import { useGetAllBankRequests, useUpdateBankRequest } from '@root/src/api/query';
import { toast } from 'react-toastify';
import Image from 'next/image';

const columnHelper = createColumnHelper<BankRequest>();

const bankColumns = [
  columnHelper.accessor((row) => row.method, {
    id: 'method',
    cell: (info) => <MethodCell method={info.getValue()} />,
    header: () => <span>Method</span>,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    cell: (info) => (
      <Center>
        <StatusCell status={info.getValue()} />
      </Center>
    ),
    header: () => <Center>Status</Center>,
  }),
  columnHelper.accessor((row) => row.source, {
    id: 'source',
    cell: (info) => info.getValue(),
    header: () => <span>From</span>,
  }),
  columnHelper.accessor((row) => row.destination, {
    id: 'destination',
    cell: (info) => info.getValue(),
    header: () => <span>To</span>,
  }),
  columnHelper.accessor((row) => row.price, {
    id: 'price',
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
  columnHelper.accessor((row) => ({ bankId: row.bankId, method: row.method, status: row.status }), {
    id: 'reject',
    cell: (info) => {
      const { bankId, method, status } = info.getValue();
      return method === 'ACCOUNT' && status === 'STANDBY' ? (
        <RejectButton bankId={bankId} />
      ) : (
        <></>
      );
    },
    header: () => <></>,
  }),
  columnHelper.accessor((row) => ({ bankId: row.bankId, method: row.method, status: row.status }), {
    id: 'approve',
    cell: (info) => {
      const { bankId, method, status } = info.getValue();
      return method === 'ACCOUNT' && status === 'STANDBY' ? (
        <ApproveButton bankId={bankId} />
      ) : (
        <></>
      );
    },
    header: () => <></>,
  }),
];

export default function BankPage() {
  const theme = useTheme();
  const [pageNum, setPageNum] = React.useState(1);
  const navigateNum = pageNum - (pageNum % 4 === 0 ? 4 : pageNum % 4) + 1;
  const navigateArr = new Array(4).fill(0).map((_, idx) => navigateNum + idx);

  const { isSuccess, data: requests, isLoading, isFetching } = useGetAllBankRequests();

  const filteredRequests = arrayDivision(
    [
      ...(requests?.sort((a, b) => {
        if (a?.updatedAt && b?.updatedAt) {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        return b.bankId - a.bankId;
      }) ?? []),
    ],
    8,
  )[pageNum - 1];
  const maxNavigate = arrayDivision([...(requests ?? [])], 8).length;

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
        {isLoading || isFetching ? (
          <LoadingWrapper>
            <Image width={64} height={64} src="/loading.gif" alt="loading" />
          </LoadingWrapper>
        ) : null}
        {isSuccess && !isFetching ? (
          <TableWrapper>
            <BankTable columns={bankColumns} data={filteredRequests} />{' '}
          </TableWrapper>
        ) : null}
        <BankBottom>
          <HStack>
            <NavigateButton onClick={handleClickPrevNav}>
              <Icon width={6} height={6} fill={theme.colors.gray300} as={LeftArrow} />
            </NavigateButton>
            {navigateArr.map((id) =>
              maxNavigate > id ? (
                <NavigateButton
                  key={id}
                  selected={pageNum === id}
                  onClick={() => handleClickNumNav(id)}
                >
                  {id}
                </NavigateButton>
              ) : null,
            )}
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

const MethodCell = ({ method }: Pick<BankRequest, 'method'>) => {
  return (
    <Flex gap="0.5rem" alignItems="center">
      {method === 'ACCOUNT' ? (
        <Icon fontSize="lg" as={Timelapse} />
      ) : (
        <Icon fontSize="lg" as={CreditCard} />
      )}
      {method}
    </Flex>
  );
};

const StatusCell = ({ status }: Pick<BankRequest, 'status'>) => {
  switch (status) {
    case 'APPROVED':
      return <Tag colorScheme="teal">승인</Tag>;
    case 'REJECTED':
      return <Tag colorScheme="red">거절</Tag>;
    case 'STANDBY':
      return <Tag colorScheme="gray">대기</Tag>;
    default:
      return <Tag colorScheme="gray">대기</Tag>;
  }
};

const DateCell = ({ updatedAt }: Pick<BankRequest, 'updatedAt'>) => {
  const theme = useTheme();
  const formattedData = updatedAt ? dateFormatter.format(new Date(updatedAt!)) : null;
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

const ApproveButton = ({ bankId }: Pick<BankRequest, 'bankId'>) => {
  const updateBankRequest = useUpdateBankRequest();
  const handleClickButton = () => {
    updateBankRequest.mutate(
      { bankId, status: 'APPROVED' },
      {
        onSuccess: () => {
          toast.success('승인 성공!');
        },
        onError: (res: any) => {
          const { data } = res?.response;

          toast.error(data?.message ?? '에러!');
        },
      },
    );
  };
  return (
    <BankButton onClick={handleClickButton} isApprove>
      승인
    </BankButton>
  );
};

const RejectButton = ({ bankId }: Pick<BankRequest, 'bankId'>) => {
  const updateBankRequest = useUpdateBankRequest();
  const handleClickButton = () => {
    updateBankRequest.mutate(
      { bankId, status: 'REJECTED' },
      {
        onSuccess: () => {
          toast.success('거절 성공!');
        },
        onError: (res: any) => {
          const { data } = res?.response;

          toast.error(data?.message ?? '에러!');
        },
      },
    );
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

const Center = styled.span`
  display: block;
  width: 100%;
  text-align: center;
`;

const TableWrapper = styled.div`
  flex-grow: 1;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
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
