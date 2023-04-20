export interface Payment {
  id: number;
  approveNm: string;
  method?: 'CARD' | 'ACCOUNT' | 'POINT';
  bankId: number;
}

export interface Partner {
  name: string;
  discount: number;
}
