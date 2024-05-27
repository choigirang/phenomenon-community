import Header from './(common)/(header)/header';
import Footer from './(common)/(footer)/footer';
import WithProvider from '@/util/provider/withProvider';

import '../style/global.css';
import WithLogin from './(common)/(login)/withLogin';
import { getMetadata } from '@/constant/metaData';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
  showLogin?: boolean;
}

/** home page meta */
export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    asPath: `/`,
  });
};

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
