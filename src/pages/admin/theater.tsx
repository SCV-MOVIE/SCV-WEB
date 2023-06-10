import Head from 'next/head';
import styled from '@emotion/styled';
import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { LeftArrow, RightArrow } from '@root/public/icons';
import React, { CSSProperties } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Theater } from '@root/src/@types';
import { AdminTheaterModal, AdminTheaterTable } from '@root/src/components/admin';
import { useGetAllTheaters } from '@root/src/api/query';
import { arrayDivision } from '@root/src/utils';

const columnHelper = createColumnHelper<Theater>();

const theaterColumns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>상영관 이름</Center>,
  }),
  columnHelper.accessor((row) => row.theaterType, {
    id: 'theaterType',
    cell: (info) => <Center>{info.getValue().toString()}</Center>,
    header: () => <Center>타입</Center>,
  }),
  columnHelper.accessor((row) => row.layout, {
    id: 'round',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>레이아웃</Center>,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'delete',
    cell: (info) => <DeleteButton id={info.getValue()} />,
    header: () => <></>,
  }),
];

export default function AdminTheaterPage() {
  const theme = useTheme();
  const [pageNum, setPageNum] = React.useState(1);
  const navigateNum = pageNum - (pageNum % 4 === 0 ? 4 : pageNum % 4) + 1;
  const navigateArr = new Array(4).fill(0).map((_, idx) => navigateNum + idx);
  const { isSuccess, data: theaters } = useGetAllTheaters();

  const filteredTheaters = arrayDivision(
    [...(theaters?.filter((theater) => theater.deleted === 'N') ?? [])],
    10,
  )[pageNum - 1];
  const maxNavigate = arrayDivision(
    [...(theaters?.filter((theater) => theater.deleted === 'N') ?? [])],
    10,
  ).length;

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
          <StyledButton onClick={onModalOpen}>상영관 생성</StyledButton>
        </Header>
        <TableWrapper>
          {isSuccess ? (
            <AdminTheaterTable columns={theaterColumns} data={filteredTheaters} />
          ) : null}
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
      <AdminTheaterModal onClose={onModalClose} isOpen={isModalOpen} />
    </>
  );
}

const DeleteButton = ({ id }: Pick<Theater, 'id'>) => {
  const handleClickButton = () => {
    console.log(id);
  };
  return <StyledDeleteButton onClick={handleClickButton}>삭제</StyledDeleteButton>;
};

export const getStaticProps = async () => ({
  props: {
    layout: 'admin',
    title: 'Theater',
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
