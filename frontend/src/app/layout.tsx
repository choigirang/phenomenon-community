import React from 'react';
import '../style/global.css';
import Header from './(common)/header';
import Footer from './(common)/footer';
import QueryProvider from '../util/provider/queryProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body>
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
