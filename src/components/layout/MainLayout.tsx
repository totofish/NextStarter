import React from 'react'

interface MainLayoutProps {
  children: React.ReactNode,
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => (
  <div className="container">
    <main className="main">
      { children }
    </main>
  </div>
)

export default MainLayout
