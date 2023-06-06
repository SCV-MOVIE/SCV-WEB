import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

function AdminMovieTable<Data extends object>({ data, columns }: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const theme = useTheme();
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta: any = header.column.columnDef.meta;
              return (
                <StyledTh
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                  color={theme.colors.gray300}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </StyledTh>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta: any = cell.column.columnDef.meta;
              return (
                <StyledTd key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTd>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

const StyledTh = styled(Th)`
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  text-transform: none;
  vertical-align: middle;
  height: 3.5rem;
`;

const StyledTd = styled(Td)`
  vertical-align: middle;
  height: 4rem;
  padding: 0.5rem 1.5rem;
`;

export default AdminMovieTable;
