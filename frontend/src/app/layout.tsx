import '../style/global.css';
import Header from './(common)/(header)/header';
import Footer from './(common)/(footer)/footer';
import Login from './(common)/(login)/login';
import WithProvider from '@/util/provider/withProvider';
import dynamic from 'next/dynamic';

interface RootLayoutProps {
  children: React.ReactNode;
  showLogin?: boolean;
}

const WithLogin = dynamic(() => import('./(common)/(login)/withLogin'), {
  ssr: false,
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="kr">
      <body className="flex flex-col justify-between">
        <div>
          <WithProvider>
            <Header />
            <WithLogin>{children}</WithLogin>
          </WithProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
