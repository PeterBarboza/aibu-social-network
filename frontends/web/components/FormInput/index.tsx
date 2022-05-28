import { useState } from "react"
import Image from "next/image"

import styles from "./styles.module.scss"
import openEyeSvg from "../../assets/icons/open-eye.svg"
import slashedEyeSvg from "../../assets/icons/slashed-eye.svg"


type props = {
  type: "text" | "password"
  formName: string
  shownName: string
  placeHolder?: string
}

export function FormInput({ formName, type, shownName, placeHolder }: props) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={styles.inputBox}>
      <p>{shownName}</p>
      {
        type === "password" ?
          <>
            <input className={styles.formInput} type={isVisible ? "text" : "password"} name={formName} placeholder={placeHolder} />
            <div className={styles.imageWrapper}>
              <Image src={isVisible ? openEyeSvg : slashedEyeSvg} alt="anything" height={30} onClick={() => setIsVisible(prevState => !prevState)} />
            </div>
          </>
          :
          <input className={styles.formInput} type={type} name={formName} placeholder={placeHolder} />
      }
    </div>
  )
}