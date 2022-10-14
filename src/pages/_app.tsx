import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { wrapper } from '@/store'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styled/theme'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import GlobalStyle from '@/styled/globalStyle'
import '@/styles/globals.scss'

function App({ Component, ...rest }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { store, props: { pageProps } } = wrapper.useWrappedStore(rest)
  const router = useRouter()

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    })

    const handleStart = () => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>App</title>
        <meta name="description" content="app page" />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme.dark}>
          <GlobalStyle />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default appWithTranslation(App)
