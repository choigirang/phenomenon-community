import '../style/global.css';
import Header from './(common)/(header)/header';
import Footer from './(common)/(footer)/footer';
import Login from './(common)/(login)/login';
import WithProvider from '@/util/provider/withProvider';

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
          <div className={`grid grid-cols-home gap-5 p-container py-10`}>
            {children}
            <Login />
          </div>
          <Footer />
        </WithProvider>
      </body>
    </html>
  );
}
