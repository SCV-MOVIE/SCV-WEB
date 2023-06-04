export const forPhoneNumber = (phone: string) => {
  return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
};

export const forSecurityNumber = (front: string, back: string) => {
  return `${front}-${back}`;
};
