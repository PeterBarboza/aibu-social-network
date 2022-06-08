import Image from "next/image"

import styles from "./styles.module.scss"

type props = {
  size: number
  imgUrl: string
}

export function ProfileImage({ imgUrl, size }: props) {
  return (
    <div className={styles.profileImage}>
      <Image src={imgUrl}
        alt="Foto de perfil"
        width={size}
        height={size}
      />
    </div>
  )
}