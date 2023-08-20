import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';

import '@/styles/App.css';
import Header from '@/components/Common/Header';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Login from '@/components/Common/Login';
import { useEffect, useState } from 'react';

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

  const [hideComponent, setHideComponent] = useState(true);

  useEffect(() => {
    const shouldHide = !router.asPath.includes('/signup') && !router.asPath.includes('/findUser');
    setHideComponent(shouldHide);
  }, [router.asPath]);

  return (
    <CookiesProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {hideComponent && <Header />}
          <Container>
            <Component {...pageProps} />
            {/* {hideComponent && <Login />} refactor 예정 */}
          </Container>
        </QueryClientProvider>
      </Provider>
    </CookiesProvider>
  );
}

const Container = styled.div`
  /* display: flex; */
  width: 100%;
  padding: var(--padding-base);
  padding-top: var(--padding-solo);
`;
