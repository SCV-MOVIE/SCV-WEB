import Head from 'next/head';
import styled from '@emotion/styled';
import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { LeftArrow, RightArrow } from '@root/public/icons';
import React, { CSSProperties } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Genre } from '@root/src/@types';
import { AdminGenreModal, AdminGenreTable, AdminTheaterModal } from '@root/src/components/admin';
import { useDeleteGenre, useGetAllMovieGenres } from '@root/src/api/query';
import { toast } from 'react-toastify';
import { arrayDivision } from '@root/src/utils';

const columnHelper = createColumnHelper<Genre>();

const genreColumns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>장르</Center>,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'delete',
    cell: (info) => <DeleteButton name={info.getValue()} />,
    header: () => <></>,
  }),
];

export default function AdminGenrePage() {
  const theme = useTheme();
  const [pageNum, setPageNum] = React.useState(1);
  const navigateNum = pageNum - (pageNum % 4 === 0 ? 4 : pageNum % 4) + 1;
  const navigateArr = new Array(4).fill(0).map((_, idx) => navigateNum + idx);
  const { isSuccess, data: genres } = useGetAllMovieGenres();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const filteredGenres = arrayDivision([...(genres ?? [])], 10)[pageNum - 1];
  const maxNavigate = arrayDivision([...(genres ?? [])], 10).length;

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
        <title>Admin / Genre</title>
        <meta name="description" content="SCV Bank Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Header>
          <StyledButton onClick={onModalOpen}>장르 생성</StyledButton>
        </Header>
        <TableWrapper>
          {isSuccess ? <AdminGenreTable columns={genreColumns} data={filteredGenres} /> : null}
        </TableWrapper>
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
      <AdminGenreModal onClose={onModalClose} isOpen={isModalOpen} />
    </>
  );
}

const DeleteButton = ({ name }: Pick<Genre, 'name'>) => {
  const deleteGenre = useDeleteGenre();
  const handleClickButton = () => {
    deleteGenre.mutate(
      { name },
      {
        onSuccess: () => {
          toast.success('삭제 성공!');
        },
        onError: (res: any) => {
          const { data } = res?.response;

          toast.error(data?.message ?? '에러!');
        },
      },
    );
  };
  return <StyledDeleteButton onClick={handleClickButton}>삭제</StyledDeleteButton>;
};

export const getStaticProps = async () => ({
  props: {
    layout: 'admin',
    title: 'Genre',
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

const StyledDeleteButton = styled.button`
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.75rem;

  font-size: small;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.reject};
`;
