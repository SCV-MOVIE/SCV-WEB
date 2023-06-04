export interface Payment {
  id: number;
  approveNm: string;
  method?: 'CARD' | 'ACCOUNT' | 'POINT';
  bankId: number;
}

export interface Partner {
  partnerId: number;
  name: string;
  discount: number;
}

export interface Information {
  name: string;
  phoneNumber: string;
  securityFrontNumber: string;
  securityBackNumber: string;
}
