import Head from 'next/head';
import styled from '@emotion/styled';
import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { LeftArrow, RightArrow } from '@root/public/icons';
import React, { CSSProperties } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Genre, Partner } from '@root/src/@types';
import { AdminPartnerModal, AdminPartnerTable } from '@root/src/components/admin';
import { useGetAllPartners } from '@root/src/api/query';
import { arrayDivision } from '@root/src/utils';
import Image from 'next/image';

const columnHelper = createColumnHelper<Partner>();

const partnerColumns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>제휴사</Center>,
  }),
  columnHelper.accessor((row) => row.discount, {
    id: 'discount',
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: () => <Center>할인 금액</Center>,
  }),
];

export default function AdminPartnerPage() {
  const theme = useTheme();
  const [pageNum, setPageNum] = React.useState(1);
  const navigateNum = pageNum - (pageNum % 4 === 0 ? 4 : pageNum % 4) + 1;
  const navigateArr = new Array(4).fill(0).map((_, idx) => navigateNum + idx);
  const { isSuccess, data: partners, isLoading } = useGetAllPartners();

  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const filteredPartners = arrayDivision(
    [...(partners?.filter((partner) => partner.name !== 'none') ?? [])],
    8,
  )[pageNum - 1];
  const maxNavigate = arrayDivision(
    [...(partners?.filter((partner) => partner.name !== 'none') ?? [])],
    8,
  ).length;

  const handleClickPrevNav = () => {
    setPageNum((prev) => Math.max(prev - 1, 1));
  };

  const handleClickNextNav = () => {
    setPageNum((prev) => (prev + 2 > maxNavigate ? prev : prev + 1));
  };

  const handleClickNumNav = (num: number) => {
    setPageNum(num);
  };
  return (
    <>
      <Head>
        <title>Admin / Partner</title>
        <meta name="description" content="SCV Bank Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Header>
          <StyledButton onClick={onModalOpen}>제휴사 등록</StyledButton>
        </Header>
        {isLoading ? (
          <LoadingWrapper>
            <Image width={64} height={64} src="/loading.gif" alt="loading" />
          </LoadingWrapper>
        ) : null}
        {isSuccess ? (
          <TableWrapper>
            <AdminPartnerTable columns={partnerColumns} data={filteredPartners} />
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
      <AdminPartnerModal onClose={onModalClose} isOpen={isModalOpen} />
    </>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: 'admin',
    title: 'Partner',
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
