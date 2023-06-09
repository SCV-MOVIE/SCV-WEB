import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '..';
import { BankRequest } from '@root/src/@types';

const BANK_KEY = 'bank';

export const useGetAllBankRequests = () =>
  useQuery([BANK_KEY], () =>
    api.get<BankRequest[]>('/api/bankAdmin/bank/list').then((res) => res.data),
  );

export const useUpdateBankRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ bankId, status }: { bankId: number; status: string }) =>
      api.patch('/api/bankAdmin/handle/ticket', { bankId, status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([BANK_KEY]);
      },
    },
  );
};
