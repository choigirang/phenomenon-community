import React, { useContext } from 'react';
import { AuthContext } from '@/components/api/AuthProvider';
import { AuthContextProps } from '@/types/type';

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
