import { FormEvent } from "react"

import { FormInput } from "../FormInput"
import { SubmitFormInput } from "../SubmitFormInput"

import styles from "./styles.module.scss"

export function LoginUserForm() {
  async function createUser(event: FormEvent) {
    event.preventDefault()

    console.log("Login")
  }

  return (
    <form className={styles.formBody} onSubmit={(event) => createUser(event)}>
      <FormInput type="text" formName="email" shownName="Email" />
      <FormInput type="password" formName="password" shownName="Senha" />
      <SubmitFormInput innerText="Login" />
    </form>
  )
}