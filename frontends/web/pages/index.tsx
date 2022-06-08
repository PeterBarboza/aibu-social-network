import type { NextPage } from 'next'
import Head from 'next/head'
import Router from "next/router"

import { useEffect } from "react"

const Home: NextPage = () => {
  useEffect(() => {
    Router.push("/feed")
  }, [])
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <p style={{ fontSize: "30px", fontFamily: "inter-bold" }}>Loading ...</p>
    </div>
  )
}

export default Home
