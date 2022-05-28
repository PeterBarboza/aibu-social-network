import styles from "./styles.module.scss"

type props = {
  innerText: string
}

export function SubmitFormInput({ innerText }: props) {
  return (
    <input className={styles.submitFormInput} type="submit" placeholder={innerText} />
  )
}