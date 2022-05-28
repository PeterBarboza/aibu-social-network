import { FormEvent } from "react"

import { FormInput } from "../FormInput"
import { SubmitFormInput } from "../SubmitFormInput"

import styles from "./styles.module.scss"

export function CreateUserForm() {
  async function createUser(event: FormEvent) {
    event.preventDefault()

    console.log("Create")
  }

  return (
    <form className={styles.formBody} onSubmit={(event => createUser(event))}>
      <FormInput type="text" formName="name" shownName="Nome" placeHolder="Ex: João Cardoso" />
      <FormInput type="text" formName="username" shownName="Nome de usuário" placeHolder="Ex: joao_card" />
      <FormInput type="text" formName="email" shownName="Email" placeHolder="Ex: joao@myemail.com" />
      <FormInput type="password" formName="password" shownName="Senha" />
      <SubmitFormInput innerText="Login" />
    </form>
  )
}