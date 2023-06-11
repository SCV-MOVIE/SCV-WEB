import Head from 'next/head';
import styled from '@emotion/styled';
import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { LeftArrow, RightArrow, TrashBin } from '@root/public/icons';
import React, { CSSProperties, useEffect } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Movie } from '@root/src/@types';
import {
  AdminMovieModal,
  AdminMovieTable,
  AdminMovieUpdateModal,
} from '@root/src/components/admin';
import { useDeleteMovie, useGetAllMovieGenres, useGetAllMovies } from '@root/src/api/query';
import { MovieRating } from '@root/src/components';
import { toast } from 'react-toastify';
import { arrayDivision } from '@root/src/utils';
import Image from 'next/image';

const columnHelper = createColumnHelper<Movie>();

const movieColumns = [
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>제목</Center>,
  }),
  columnHelper.accessor((row) => row.rating, {
    id: 'round',
    cell: (info) => (
      <Center>
        <MovieRating rating={info.getValue()} size="sm" />
      </Center>
    ),
    header: () => <Center>등급</Center>,
  }),
  columnHelper.accessor((row) => row.length, {
    id: 'length',
    cell: (info) => <Center>{info.getValue()}분</Center>,
    header: () => <Center>상영 시간</Center>,
  }),
  columnHelper.accessor((row) => row.distributor, {
    id: 'distributor',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>배급사</Center>,
  }),
  columnHelper.accessor((row) => row.genreDTOList, {
    id: 'genre',
    cell: (info) => (
      <Center>
        {info
          .getValue()
          .map((elem) => elem.name)
          .join(', ')}
      </Center>
    ),
    header: () => <Center>장르</Center>,
  }),
  columnHelper.accessor((row) => row.director, {
    id: 'director',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>감독</Center>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'delete',
    cell: (info) => <DeleteButton id={info.getValue()} />,
    header: () => <></>,
  }),
];

export default function AdminMoviePage() {
  const theme = useTheme();
  const [pageNum, setPageNum] = React.useState(1);
  const [updateMovie, setUpdateMovie] = React.useState<Movie | null>(null);
  const navigateNum = pageNum - (pageNum % 4 === 0 ? 4 : pageNum % 4) + 1;
  const navigateArr = new Array(4).fill(0).map((_, idx) => navigateNum + idx);
  const { isSuccess, data: movies, isLoading } = useGetAllMovies();
  const { data: genres } = useGetAllMovieGenres();

  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();

  const filteredMovies = arrayDivision([...(movies ?? [])], 10)[pageNum - 1];
  const maxNavigate = arrayDivision([...(movies ?? [])], 10).length;

  const handleClickRow = (id: number) => {
    if (id === updateMovie?.id) {
      onUpdateModalOpen();
      return;
    }
    setUpdateMovie(filteredMovies.find((movie: Movie) => movie?.id === id));
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

  useEffect(() => {
    if (updateMovie) {
      onUpdateModalOpen();
    }
  }, [updateMovie, onUpdateModalOpen]);
  return (
    <>
      <Head>
        <title>Admin / Movie</title>
        <meta name="description" content="SCV Bank Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Header>
          <StyledButton onClick={onModalOpen}>영화 생성</StyledButton>
        </Header>
        {isLoading ? (
          <LoadingWrapper>
            <Image width={64} height={64} src="/loading.gif" alt="loading" />
          </LoadingWrapper>
        ) : null}
        {isSuccess ? (
          <TableWrapper>
            <AdminMovieTable
              columns={movieColumns}
              data={filteredMovies}
              handleClickRow={handleClickRow}
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
      <AdminMovieModal genres={genres ?? []} isOpen={isModalOpen} onClose={onModalClose} />
      {updateMovie && (
        <AdminMovieUpdateModal
          data={updateMovie}
          genres={genres ?? []}
          isOpen={isUpdateModalOpen}
          onClose={onUpdateModalClose}
        />
      )}
    </>
  );
}

const DeleteButton = ({ id }: Pick<Movie, 'id'>) => {
  const deleteMovie = useDeleteMovie();
  const handleClickButton = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    deleteMovie.mutate(id, {
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

export const getStaticProps = async () => ({
  props: {
    layout: 'admin',
    title: 'Movie',
  },
});

const Header = styled.div`
  width: 100%;
  height: 3rem;

  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  width: 100%;
  height: 100%;

  padding: 1rem 2rem 5rem 2rem;
`;

const Bottom = styled.div`
  width: 100%;
  height: 3rem;

  display: flex;
  justify-content: flex-end;
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

const Center = styled.span`
  display: block;
  width: 100%;
  text-align: center;
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

const StyledIcon = styled(Icon)`
  cursor: pointer;
  &:hover {
    path {
      fill: ${({ theme }) => theme.colors.reject};
    }
  }
`;
