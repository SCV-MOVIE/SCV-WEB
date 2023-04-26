import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '../theme';
import { MainLayout } from '../components';
import { initialUserValue, UserContext, UserContextProvider } from '../components/Modal/user';
import React from 'react';
import { User } from '../@types';

const queryClient = new QueryClient();

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/pretendard-bold.woff',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState<User>(initialUserValue);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider user={user} setUser={setUser}>
          <main className={pretendard.className}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </main>
        </UserContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
