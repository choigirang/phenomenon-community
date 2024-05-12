import React from 'react';
import '../style/global.css';
import Header from './(common)/header';
import Footer from './(common)/footer';
import QueryProvider from '../util/provider/queryProvider';
import Login from './(home)/login';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body>
        <QueryProvider>
          <Header />
          <div className="grid grid-cols-home gap-5 p-container py-10">
            {children}
            <Login />
          </div>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
