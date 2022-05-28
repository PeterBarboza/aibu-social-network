import { ReactNode } from 'react'
import styles from "./styles.module.scss"

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}
