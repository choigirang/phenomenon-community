import '../style/global.css';
import Header from './(common)/(header)/header';
import Footer from './(common)/(footer)/footer';
import Login from './(common)/(login)/login';
import WithProvider from '@/util/provider/withProvider';
import WithLogin from './(common)/(login)/withLogin';

interface RootLayoutProps {
  children: React.ReactNode;
  showLogin?: boolean;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="kr">
      <body>
        <WithProvider>
          <Header />
          <WithLogin>{children}</WithLogin>
          <Footer />
        </WithProvider>
      </body>
    </html>
  );
}
