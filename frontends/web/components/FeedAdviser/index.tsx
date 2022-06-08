import styles from "./styles.module.scss"

type props = {
  text: string
}

export function FeedAdviser({ text }: props) {
  return (
    <div className={styles.feedAdviser}>
      <p>
        {text}
      </p>
    </div>
  )
}