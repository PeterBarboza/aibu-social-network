import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from "../components/Layout"
import { Header } from '../components/Header'
import { Logo } from '../components/Logo'
import { FeedMain } from '../components/FeedMain'
import { Post } from '../components/Post'
import { FeedAdviser } from '../components/FeedAdviser'
import { FooterBar } from '../components/FooterBar'

const Feed: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Aibu - Social network</title>
        <meta name="description" content="Made with love by Pedro Barboza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Logo width={60} />
      </Header>
      <FeedMain>
        {/*
          TODO: Adicionar botão de "Ver mais..." nos posts quando o texto for muito grande.
        */}
        <Post
          imgUrl="https://github.com/PeterBarboza.png"
          username="barbozz"
          content="Some awsome tweet like content here. World of Warcraft is an amazing game."
          likesCount={15}
          commentsCount={5}
        />
        <FeedAdviser text="This is a test adviser" />
      </FeedMain>
      <FooterBar />
    </Layout>
  )
}

export default Feed
