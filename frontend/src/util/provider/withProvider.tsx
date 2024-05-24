import React from 'react';
import ReduxProvider from './reduxProvider';

/** 2024/05/12 - provider wrapper in ssr*/
export default function WithProvider({ children }: React.PropsWithChildren) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
