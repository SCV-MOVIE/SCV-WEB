import Head from 'next/head';
import styled from '@emotion/styled';
import { createColumnHelper } from '@tanstack/react-table';
import { Button, Flex, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { Calendar, LeftArrow, Private, Public, RightArrow } from '@root/public/icons';
import React, { CSSProperties } from 'react';
import { Movie, ShowTime, Theater } from '@root/src/@types';
import AdminShowTimeTable from '@root/src/components/admin/AdminShowTimeTable';
import { getYYYYMMDD, runningTime } from '@root/src/utils';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useGetAllShowTimes } from '@root/src/api/query/showTimeQuery';
import { AdminShowTimeModal } from '@root/src/components/admin';
import { api } from '@root/src/api';
import { GetServerSideProps } from 'next';

const columnHelper = createColumnHelper<ShowTime>();

const showTimeColumns = [
  columnHelper.accessor((row) => row.isPublic, {
    id: 'isPublic',
    cell: (info) => <StatusCell isPublic={info.getValue()} />,
    header: () => <span>상태</span>,
  }),
  columnHelper.accessor((row) => row.theaterName, {
    id: 'theaterName',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>상영관</Center>,
  }),
  columnHelper.accessor((row) => row.movieDTO.name, {
    id: 'movieName',
    cell: (info) => info.getValue(),
    header: () => <span>영화</span>,
  }),
  columnHelper.accessor((row) => row.round, {
    id: 'round',
    cell: (info) => <Center>{info.getValue()}회차</Center>,
    header: () => <Center>회차</Center>,
  }),
  columnHelper.accessor((row) => ({ startDate: row.startDate, length: row.movieDTO.length }), {
    id: 'startDate',
    cell: (info) => (
      <LengthCell startDate={info.getValue().startDate} length={info.getValue().length} />
    ),
    header: () => <Center>상영시간</Center>,
  }),
  columnHelper.accessor((row) => `${row.remainSeatNm}/${row.theaterSize}`, {
    id: 'amount',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>관객수</Center>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'remove',
    cell: (info) => <RejectButton id={info.getValue()} />,
    header: () => <></>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'approve',
    cell: (info) => <ApproveButton id={info.getValue()} />,
    header: () => <></>,
  }),
];

interface Props {
  movies: Movie[];
  theaters: Theater[];
}

export default function AdminDashBoardPage({ movies, theaters }: Props) {
  const theme = useTheme();
  const [pageNum, setPageNum] = React.useState(1);
  const [dateFilter, setDateFilter] = React.useState<Date | null>(new Date());
  const navigateNum = pageNum - (pageNum % 4 === 0 ? 4 : pageNum % 4) + 1;
  const navigateArr = new Array(4).fill(0).map((_, idx) => navigateNum + idx);

  const { data: showtimes, isSuccess } = useGetAllShowTimes();

  const filteredShowtimes =
    showtimes?.filter((showtime) =>
      showtime.startDate.includes(getYYYYMMDD(dateFilter ?? new Date(), '-')),
    ) ?? [];

  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

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
        <title>Admin</title>
        <meta name="description" content="SCV Bank Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Header>
          <DatePickerWrapper>
            <Icon as={Calendar} fontSize="lg" mr={2} />
            <StyledDatePicker
              selected={dateFilter}
              onChange={(date) => setDateFilter(date as Date)}
              dateFormat="yyyy-MM-dd"
            />
          </DatePickerWrapper>
          <StyledButton onClick={onModalOpen}>일정 생성</StyledButton>
        </Header>
        <TableWrapper>
          {isSuccess ? (
            <AdminShowTimeTable columns={showTimeColumns} data={filteredShowtimes} />
          ) : null}
        </TableWrapper>
        <Bottom>
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
        </Bottom>
      </Content>
      <AdminShowTimeModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        movies={movies}
        theaters={theaters}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Pick<Props, 'movies'>> = async () => {
  try {
    const movie = await api.get<Movie[]>('/api/movie/list');
    const theater = await api.get<Theater[]>('/api/theater/list');

    return {
      props: {
        movies: movie.data,
        theaters: theater.data,
        layout: 'admin',
        title: 'Showtime',
      },
    };
  } catch (error) {
    return {
      props: {
        theaters: [],
        movies: [],
        layout: 'admin',
        title: 'Showtime',
      },
    };
  }
};

const StatusCell = ({ isPublic }: Pick<ShowTime, 'isPublic'>) => {
  return (
    <Flex gap="1rem" alignItems="center">
      {isPublic ? (
        <>
          <Icon fontSize="lg" as={Public} />
          Public
        </>
      ) : (
        <>
          <Icon fontSize="lg" as={Private} />
          Private
        </>
      )}
    </Flex>
  );
};

const LengthCell = ({
  startDate,
  length,
}: Pick<ShowTime, 'startDate'> & Pick<ShowTime['movieDTO'], 'length'>) => {
  const content = runningTime(new Date(startDate), Number(length));

  return <Center>{content}</Center>;
};

const ApproveButton = ({ id }: Pick<ShowTime, 'id'>) => {
  const handleClickButton = () => {
    console.log(id);
  };
  return (
    <ShowTimeButton onClick={handleClickButton} isApprove>
      승인
    </ShowTimeButton>
  );
};

const RejectButton = ({ id }: Pick<ShowTime, 'id'>) => {
  const handleClickButton = () => {
    console.log(id);
  };
  return (
    <ShowTimeButton onClick={handleClickButton} isRemove>
      삭제
    </ShowTimeButton>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 1rem;

  padding: 2rem 2rem 5rem 2rem;
`;

const Center = styled.span`
  display: block;
  width: 100%;
  text-align: center;
`;

const Header = styled.div`
  width: 100%;
  height: 3rem;

  display: flex;
  justify-content: space-between;
`;

const TableWrapper = styled.div`
  flex-grow: 1;
`;

const Bottom = styled.div`
  width: 100%;
  height: 3rem;

  display: flex;
  justify-content: flex-end;
`;

const DatePickerWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;

  height: auto;
`;

const StyledDatePicker = styled(ReactDatePicker)`
  width: 6rem;
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

type ShowTimeButtonProps = CSSProperties & {
  isApprove?: boolean;
  isRemove?: boolean;
};
const ShowTimeButton = styled.button<ShowTimeButtonProps>`
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.75rem;

  font-size: small;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, isApprove, isRemove }) =>
    isApprove ? theme.colors.approve : isRemove ? theme.colors.reject : 'none'};
`;
