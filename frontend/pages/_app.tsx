import '@/styles/App.css';
import { QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { QueryClient } from 'react-query';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

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
    <QueryClientProvider client={queryClient}>
      {router.asPath !== '/signup' && router.asPath !== '/findUser' && <Header />}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
