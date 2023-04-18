import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '../theme';
import { MainLayout } from '../components';

const queryClient = new QueryClient();

const pretandard = localFont({
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
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <style jsx global>{`
            html {
              font-family: ${pretandard.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
        </MainLayout>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
