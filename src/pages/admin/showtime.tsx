import Head from 'next/head';
import styled from '@emotion/styled';
import { createColumnHelper } from '@tanstack/react-table';
import { Button, Flex, HStack, Icon, Tag, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { Calendar, LeftArrow, Private, Public, RightArrow, TrashBin } from '@root/public/icons';
import React, { CSSProperties } from 'react';
import { Movie, ShowTime, Theater } from '@root/src/@types';
import AdminShowTimeTable from '@root/src/components/admin/AdminShowTimeTable';
import { arrayDivision, getYYYYMMDD, runningTime } from '@root/src/utils';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import {
  useDeleteShowTime,
  useGetAllShowTimes,
  usePublishShowTime,
} from '@root/src/api/query/showTimeQuery';
import { AdminShowTimeModal, AdminShowTimeUpdateModal } from '@root/src/components/admin';
import { api } from '@root/src/api';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { toast } from 'react-toastify';

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
  columnHelper.accessor(
    (row) => ({ remainSeatNm: row.remainSeatNm, theaterSize: row.theaterSize }),
    {
      id: 'amount',
      cell: (info) => {
        const { remainSeatNm, theaterSize } = info.getValue();
        const isOccupied = remainSeatNm === 0;
        const seats = `${remainSeatNm}/${theaterSize}`;
        return <Center>{isOccupied ? <Tag colorScheme="gray">매진</Tag> : seats}</Center>;
      },
      header: () => <Center>잔여석</Center>,
    },
  ),
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => <RejectButton id={info.getValue()} />,
    header: () => <></>,
  }),
  columnHelper.accessor((row) => ({ id: row.id, isPublic: row.isPublic }), {
    id: 'approve',
    cell: (info) => {
      const { id, isPublic } = info.getValue();
      if (isPublic === 'Y') {
        return <></>;
      }
      return <ApproveButton id={id} />;
    },
    header: () => <></>,
  }),
];

interface Props {
  movies: Movie[];
  theaters: Theater[];
}

export default function AdminShowTimePage({ movies, theaters }: Props) {
  const theme = useTheme();
  const [pageNum, setPageNum] = React.useState(1);
  const [updateShowTime, setUpdateShowTime] = React.useState<ShowTime | null>(null);
  const [dateFilter, setDateFilter] = React.useState<Date | null>(new Date());
  const navigateNum = pageNum - (pageNum % 4 === 0 ? 4 : pageNum % 4) + 1;
  const navigateArr = new Array(4).fill(0).map((_, idx) => navigateNum + idx);

  const { data: showtimes, isSuccess, isLoading, isFetching } = useGetAllShowTimes();

  const filteredShowtimes = arrayDivision(
    [
      ...(showtimes
        ?.filter((showtime) =>
          showtime.startDate.includes(getYYYYMMDD(dateFilter ?? new Date(), '-')),
        )
        .sort((a, b) => {
          if (a.startDate === b.startDate) {
            return a.theaterName > b.theaterName ? 1 : -1;
          }
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        }) ?? []),
    ],
    8,
  )[pageNum - 1];
  const maxNavigate = arrayDivision(
    [
      ...(showtimes?.filter((showtime) =>
        showtime.startDate.includes(getYYYYMMDD(dateFilter ?? new Date(), '-')),
      ) ?? []),
    ],
    8,
  ).length;

  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();

  const handleClickRow = (id: number) => {
    if (id === updateShowTime?.id) {
      onUpdateModalOpen();
      return;
    }
    setUpdateShowTime(filteredShowtimes.find((showTime: ShowTime) => showTime?.id === id));
  };

  const handleClickPrevNav = () => {
    setPageNum((prev) => Math.max(prev - 1, 1));
  };

  const handleClickNextNav = () => {
    setPageNum((prev) => prev + 1);
  };

  const handleClickNumNav = (num: number) => {
    setPageNum(num);
  };

  React.useEffect(() => {
    if (updateShowTime) {
      onUpdateModalOpen();
    }
  }, [updateShowTime, onUpdateModalOpen]);
  return (
    <>
      <Head>
        <title>Admin / Showtime</title>
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
        {isLoading || isFetching ? (
          <LoadingWrapper>
            <Image width={64} height={64} src="/loading.gif" alt="loading" />
          </LoadingWrapper>
        ) : null}
        {isSuccess && !isFetching ? (
          <TableWrapper>
            <AdminShowTimeTable
              handleClickRow={handleClickRow}
              columns={showTimeColumns}
              data={filteredShowtimes}
            />
          </TableWrapper>
        ) : null}
        <Bottom>
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
        </Bottom>
      </Content>
      <AdminShowTimeModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        movies={movies}
        theaters={theaters.sort((a, b) => {
          if (a.name === b.name) {
            return b.id - a.id;
          }
          return a.name > b.name ? 1 : -1;
        })}
      />
      {updateShowTime && (
        <AdminShowTimeUpdateModal
          data={updateShowTime}
          movies={movies}
          theaters={theaters.sort((a, b) => {
            if (a.name === b.name) {
              return b.id - a.id;
            }
            return a.name > b.name ? 1 : -1;
          })}
          isOpen={isUpdateModalOpen}
          onClose={onUpdateModalClose}
        />
      )}
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
      {isPublic === 'Y' ? (
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
  const publishShowTime = usePublishShowTime();
  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    publishShowTime.mutate(id, {
      onSuccess: () => {
        toast.success('공개 성공!');
      },
      onError: (res: any) => {
        const { data } = res?.response;

        toast.error(data?.message ?? '공개 실패!');
      },
    });
  };
  return (
    <ShowTimeButton onClick={handleClickButton} isApprove>
      승인
    </ShowTimeButton>
  );
};

const RejectButton = ({ id }: Pick<ShowTime, 'id'>) => {
  const deleteShowTime = useDeleteShowTime();
  const handleClickButton = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    deleteShowTime.mutate(id, {
      onSuccess: () => {
        toast.success('삭제 성공!');
      },
      onError: (res: any) => {
        const { data } = res?.response;

        toast.error(data?.message ?? '삭제 실패!');
      },
    });
  };
  return <StyledIcon as={TrashBin} fontSize="xl" onClick={handleClickButton} />;
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

const LoadingWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
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

const StyledIcon = styled(Icon)`
  cursor: pointer;
  &:hover {
    path {
      fill: ${({ theme }) => theme.colors.reject};
    }
  }
`;
