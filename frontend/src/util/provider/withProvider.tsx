import React from 'react';
import ReduxProvider from './reduxProvider';

export default function WithProvider({ children }: React.PropsWithChildren) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
