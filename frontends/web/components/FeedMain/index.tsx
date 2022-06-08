import { ReactNode } from "react"
import styles from "./styles.module.scss"

type props = {
  children: ReactNode
}

export function FeedMain({ children }: props) {
  return (
    <main className={styles.feedMain}>
      {children}
    </main>
  )
}