import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';

import '@/styles/App.css';
import Header from '@/components/Common/Header';
import styled from 'styled-components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        {!router.asPath.includes('/signup') && !router.asPath.includes('/findUser') && <Header />}
        <Container>
          <Component {...pageProps} />
        </Container>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

const Container = styled.div`
  padding: var(--padding-base);
  padding-top: var(--padding-solo);
`;
