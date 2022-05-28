import Image from "next/image"

import styles from "./styles.module.scss"

import logo from "../../assets/icons/logo-full.svg"

type props = {
  width?: number
}

export function Logo({ width }: props) {
  return (
    <div className={styles.logo}>
      <Image src={logo} alt="Aibu" width={width ? width : 30} />
    </div>
  )
}