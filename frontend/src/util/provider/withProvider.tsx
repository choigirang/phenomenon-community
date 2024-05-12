import React from 'react';
import QueryProvider from './queryProvider';

export default function WithProvider({ children }: React.PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
}
