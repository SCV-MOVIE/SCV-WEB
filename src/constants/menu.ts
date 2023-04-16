const bookMovieMenus = [
  {
    title: '예매 하기',
    href: '/book',
  },
  {
    title: '예매 내역 확인',
    href: '/book/confirm',
  },
];

export const MENUS = {
  book: bookMovieMenus,
  bookMain: {
    title: '영화 예매',
    href: '/book',
  },
} as const;
