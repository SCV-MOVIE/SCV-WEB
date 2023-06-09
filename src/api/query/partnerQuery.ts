import { useMutation, useQuery } from 'react-query';
import { api } from '..';
import { Partner, RequestPartner } from '@root/src/@types';

const PARTNER_KEY = 'partner';

export const useGetAllPartners = () =>
  useQuery([PARTNER_KEY], () => api.get<Partner[]>('/api/partner/list').then((res) => res.data));

export const useCreatePartner = () =>
  useMutation((data: RequestPartner) => api.post('/api/partner', data));
