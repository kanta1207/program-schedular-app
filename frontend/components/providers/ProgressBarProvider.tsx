'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import theme from '@/app/theme';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color={theme.palette.info.main} options={{ showSpinner: false }} />
    </>
  );
};

export default ProgressBarProvider;
