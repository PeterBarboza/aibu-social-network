import { Schema, model } from "mongoose"

import { IUser } from "../types/IUser"

//TODO: Talvez adicionar campo de lastAccess, para armazenar o momento do último login
//para assim usa-lo para fazer o get dos posts e evitar posts repetidos.
//TODO: Adicionar campo ImgUrl/ImgFile para permitir o upload de fotos
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  username: {
    type: String,
    required: true,
    minlength: 1
  },
  bio: {
    type: String
  },
  createdAt: {
    type: Number,
    required: true
  }
})

const User = model("user", userSchema)

export { User }