import { ReactNode } from "react"
import styles from "./styles.module.scss"

type props = {
  children: ReactNode
}

export function Header({ children }: props) {
  return (
    <header className={styles.header}>
      {children}
    </header>
  )
}