import { FC, ReactNode } from 'react';
import Header from '@/components/layouts/Header';
import Container from '@/components/layouts/Container';

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout: FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
    </div>
  );
};

export default SiteLayout;
