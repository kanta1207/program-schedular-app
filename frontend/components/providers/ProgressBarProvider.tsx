'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color={'#FFFFFF80'} options={{ showSpinner: false }} />
    </>
  );
};

export default ProgressBarProvider;
