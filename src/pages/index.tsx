import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Head from 'next/head'
import Button from '@/styled/Button'
import TitleShake from '@/styled/TitleShake'
import MainLayout from '@/components/layout/MainLayout'

const Home: NextPage = () => {
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
          <TitleShake data-shadow="Index">Index</TitleShake>
          <Button red type="button" onClick={goToDatePage}>date</Button>
        </h1>
      </MainLayout>
    </>
  )
}

export default Home
