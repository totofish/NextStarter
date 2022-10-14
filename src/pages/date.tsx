import React, { useCallback, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from '@/store'
import Button from '@/styled/Button'
import Date from '@/styled/Date'
import TitleShake from '@/styled/TitleShake'
import {
  // useGetDateQuery, useLazyGetDateQuery,
  getDate,
} from '@/services/api'
import { getIp } from '@/services/ipApi'
import { useAppDispatch, useAppSelector } from '@/hooks'
import MainLayout from '@/components/layout/MainLayout'

interface DatePageProps {
  ip: string
}

const DatePage: NextPage<DatePageProps> = ({ ip }: DatePageProps) => {
  const { t } = useTranslation(['common', 'date'])
  const router = useRouter()
  const dispatch = useAppDispatch()

  const goToIndexPage = useCallback(() => {
    void router.push('/')
  }, [router])

  // const {
  //   data, error, isLoading, isFetching,
  //   refetch,
  // } = useGetDateQuery(undefined, { refetchOnMountOrArgChange: false })

  // const refetchDate = useCallback(() => {
  //   refetch()
  // }, [refetch])

  const { data, error, isLoading } = useAppSelector(getDate.select())

  useEffect(() => {
    if (data) {
      const result = dispatch(getDate.initiate())
      return void result.unsubscribe
    }
    return undefined
  }, [data, dispatch])

  const refetchDate = useCallback(() => {
    void dispatch(getDate.initiate(undefined, { forceRefetch: true }))
  }, [dispatch])

  const renderDate = useMemo(() => (
    <Date $loading={isLoading}>
      { data?.date }
      { error ? JSON.stringify(error) : null }
    </Date>
  ), [isLoading, data, error])

  return (
    <>
      <Head>
        <title>DatePage</title>
        <meta name="description" content="about page" />
      </Head>

      <MainLayout>
        <h1 className="title" role="presentation">
          <TitleShake locale={router.locale} data-shadow={t('title', { ns: 'date' })}>{t('title', { ns: 'date' })}</TitleShake>
          <Button red type="button" onClick={goToIndexPage}>{t('nav.index')}</Button>
          <Button type="button" onClick={refetchDate}>{t('refetch')}</Button>
        </h1>
        { renderDate }
        <small>{ ip }</small>
      </MainLayout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const [ipResult] = await Promise.all([
    store.dispatch(getIp.initiate()),
    store.dispatch(getDate.initiate(undefined, { forceRefetch: true })),
  ])
  return {
    props: {
      ...await serverSideTranslations(locale as string, ['common', 'date']),
      ip: ipResult?.data?.ip,
    },
  }
})

export default DatePage
