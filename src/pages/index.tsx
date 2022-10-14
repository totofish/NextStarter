import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Button from '@/styled/Button'
import TitleShake from '@/styled/TitleShake'
import MainLayout from '@/components/layout/MainLayout'

const Home: NextPage = () => {
  const { t } = useTranslation(['common', 'index'])
  const router = useRouter()
  const goToDatePage = useCallback(() => {
    void router.push('date')
  }, [router])

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="home page" />
      </Head>

      <MainLayout>
        <h1 className="title">
          <TitleShake locale={router.locale} data-shadow={t('title', { ns: 'index' })}>{t('title', { ns: 'index' })}</TitleShake>
          <Button red type="button" onClick={goToDatePage}>{t('nav.date')}</Button>
        </h1>
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale as string, ['common', 'index']),
  },
})

export default Home
