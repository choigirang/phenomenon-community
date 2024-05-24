'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

/** 2024/05/12 - redux wrapper in client */
export default function ReduxProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
