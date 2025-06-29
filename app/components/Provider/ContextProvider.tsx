'use client';

import React, { useEffect, useState } from 'react';
import GlobalSytlesProvider from './GlobalSytlesProvider';
import { GlobalContextProvider } from '@/app/context/globalContextProvider';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='w-full h-screen flex items-center justify-center'>
      <span className="loader"></span>
    </div>;
  }

  return (
    <GlobalContextProvider>
      <Toaster />
      <GlobalSytlesProvider>{children}</GlobalSytlesProvider>
    </GlobalContextProvider>
  );
};

export default ContextProvider;
