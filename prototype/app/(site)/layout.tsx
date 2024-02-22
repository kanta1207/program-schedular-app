import Header from '@/components/Header'
import { FC, ReactNode } from 'react'

interface SiteLayoutProps {
  children: ReactNode
}

const SiteLayout: FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">{children}</div>
    </div>
  )
}

export default SiteLayout
