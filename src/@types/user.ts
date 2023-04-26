export type UserLevel = 'COMMON' | 'VIP' | 'VVIP';
export interface User {
  id: number;
  loginId: string;
  point: number;
  name: string;
  phoneNumber: string;
  level: UserLevel;
}
