import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"

import { Layout } from "../components/Layout"
import { Logo } from "../../web/components/Logo"
import { CreateUserForm } from "../components/CreateUserForm"
import { LoginUserForm } from "../components/LoginUserForm"

import styles from "../styles/auth.module.scss"

const Auth: NextPage = () => {
  const [isNewAccount, setIsNewAccount] = useState(false)

  return (
    <Layout>
      <Head>
        <title>Aibu - Social network</title>
        <meta name="description" content="Made with love by Pedro Barboza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.authBox}>
        <header className={styles.logoDiv}>
          <Logo width={150} />
        </header>
        <div className={styles.formBox}>
          {
            isNewAccount ?
              <>
                <CreateUserForm />
                <p className={styles.authOption}>
                  Já tem uma conta? <span onClick={() => setIsNewAccount(prevState => !prevState)}>Faça login aqui</span>
                </p>
              </>
              :
              <>
                <LoginUserForm />
                <p className={styles.authOption}>
                  Não tem uma conta? <span onClick={() => setIsNewAccount(prevState => !prevState)}>Cadastre-se aqui</span>
                </p>
              </>
          }
        </div>
        <footer className={styles.footer}>
          <p>By Pedro Barboza</p>
        </footer>
      </main>

    </Layout>
  )
}

export default Auth
