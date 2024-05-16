'use client';

import { store } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function ReduxProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
