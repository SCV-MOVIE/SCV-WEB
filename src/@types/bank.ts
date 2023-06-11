export interface BankRequest {
  bankId: number;
  method: 'ACCOUNT' | 'CARD';
  status: 'APPROVED' | 'REJECTED' | 'STANDBY';
  source: string;
  destination: string;
  price: number;
  updatedAt: string | null;
  approveNm: string | null;
}
