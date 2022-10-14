import React, { forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

/* LanguageButton Component */

interface LanguageButtonProps {
  onClick: () => void;
  text: string;
  href?: string;
}

const LanguageButton = forwardRef<HTMLAnchorElement, LanguageButtonProps>(
  ({ onClick, href, text }, ref) => (
    <a href={href} onClick={onClick} ref={ref}>
      { text }
    </a>
  ),
)

LanguageButton.defaultProps = {
  href: '',
}

/* MainLayout Component */

interface MainLayoutProps {
  children: React.ReactNode,
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  const router = useRouter()
  const setDefaultLang = (lang: string) => {
    Cookies.set('NEXT_LOCALE', lang, { sameSite: 'strict', secure: true })
  }
  return (
    <div className="container">
      <ul className="language">
        <li>
          <Link href={router.pathname} locale="en" passHref>
            <LanguageButton text="English" onClick={() => setDefaultLang('en')} />
          </Link>
        </li>
        <li>
          <Link href={router.pathname} locale="zh-TW" passHref>
            <LanguageButton text="中文" onClick={() => setDefaultLang('zh-TW')} />
          </Link>
        </li>
      </ul>
      <main className="main">
        { children }
      </main>
    </div>
  )
}

export default MainLayout
