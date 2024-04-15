import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import 'gantt-task-react/dist/index.css';
import { ToastContainer } from 'react-toastify';
import theme from './theme';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import ProgressBarProvider from '@/components/providers/ProgressBarProvider';

export const metadata: Metadata = {
  title: 'Scheduler App',
  description: 'Scheduler application for digital marketing program manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <AppRouterCacheProvider>
          <ToastContainer position="top-right" autoClose={5000} />
          <ThemeProvider theme={theme}>
            <ProgressBarProvider>{children}</ProgressBarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
