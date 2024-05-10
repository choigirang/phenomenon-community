import React from 'react';
import '../style/global.css';
import Header from './(nav)/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
