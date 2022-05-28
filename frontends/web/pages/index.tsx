import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from "../components/Layout"
import { Header } from '../components/Header'
import { Logo } from '../components/Logo'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Aibu - Social network</title>
        <meta name="description" content="Made with love by Pedro Barboza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Logo />
      </Header>
    </Layout>
  )
}

export default Home
