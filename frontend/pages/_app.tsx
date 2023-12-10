import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import Header from '@/components/Common/Header';

import styled from 'styled-components';
import '@/styles/App.css';
import store, { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/actions/user';
import Footer from '@/components/Common/Footer';

export const queryClient = new QueryClient({
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

    const user = localStorage.getItem('user');
  }, []);

  return (
    <CookiesProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {hideComponent && <Header />}
          <Container>
            <LoginState>
              <Component {...pageProps} />
              {/* {hideComponent && <Login />} refactor 예정 */}
            </LoginState>
          </Container>
          <Footer />
        </QueryClientProvider>
      </Provider>
    </CookiesProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 70vh;
  padding: var(--padding-base);
  padding-top: var(--padding-solo);
`;

function LoginState({ children }: { children?: ReactNode }) {
  // 컴포넌트 리렌더 시 로그인 데이터 확인하여 로그인 유지
  const loginData = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginData.login) {
      const getLocalData = localStorage.getItem('user');
      if (getLocalData) {
        const parsedLocalData = JSON.parse(getLocalData);

        dispatch(loginSuccess(parsedLocalData));
      }
    }
  }, [dispatch, loginData]);

  return <>{children}</>;
}
