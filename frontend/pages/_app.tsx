import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from '@/components/Header';
import '@/styles/App.css';
import { CookiesProvider } from 'react-cookie';

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
        <Component {...pageProps} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}
