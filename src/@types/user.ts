export type Membership = 'COMMON' | 'VIP' | 'VVIP';
export interface User {
  id: number;
  loginId: string;
  isMember: 'Y' | 'N';
  point: number;
  name: string;
  password: string;
  phoneNm: string;
  securityNm: string;
  membership: Membership | null;
}

export interface RequestUpdateUser {
  clientId: number;
  newMembership: Membership;
  newPoint: string;
}
