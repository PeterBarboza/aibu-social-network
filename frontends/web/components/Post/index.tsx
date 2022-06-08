import Image from "next/image"

import { ProfileImage } from "../ProfileImage"

import fullfiledLike from "../../assets/icons/thumb-fullfiled.svg"
import outlineLike from "../../assets/icons/thumb-outline.svg"
import fullfiledComment from "../../assets/icons/comment-fullfiled.svg"

import styles from "./styles.module.scss"

type props = {
  username: string
  content: string
  imgUrl: string
  likesCount: number
  commentsCount: number
}

export function Post({ imgUrl, username, content, likesCount, commentsCount }: props) {
  return (
    <article className={styles.post}>
      <div className={styles.profileImage}>
        <ProfileImage imgUrl={imgUrl} size={50} />
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.usernameBox}>
          @{username}
        </div>
        <div className={styles.postContent}>
          {content}
        </div>
        <div className={styles.interactions}>
          <div>
            <Image src={outlineLike} width={20} height={20} alt={`${likesCount} Curtidas`} />
            <p>{likesCount}</p>
          </div>
          <div>
            <Image src={fullfiledComment} width={20} height={20} alt={`${commentsCount} Comentários`} />
            <p>{commentsCount}</p>
          </div>
        </div>
      </div>
    </article>
  )
}