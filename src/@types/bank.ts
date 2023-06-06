export interface BankDashBoard {
  id: number;
  method: 'Bank' | 'Card';
  from: string;
  to: string;
  amount: number;
  updatedAt: Date | null;
  approveNm: string | null;
}
