import dynamic from 'next/dynamic';
import Header from './(common)/(header)/header';
import Footer from './(common)/(footer)/footer';
import WithProvider from '@/util/provider/withProvider';

import '../style/global.css';

interface RootLayoutProps {
  children: React.ReactNode;
  showLogin?: boolean;
}

const WithLogin = dynamic(() => import('./(common)/(login)/withLogin'), {
  ssr: false,
});

/** 2024/05/23 - layout by path(withLogin) */
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
