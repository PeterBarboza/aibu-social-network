import { Request } from "express"

import { User } from "../../models/user"

import { IResponseData, IUser } from "../../types/IUser"
import { generateToken } from "../../utils/generateToken"

export async function createUserService(req: Request): Promise<IResponseData> {
  const { name, email, password }: IUser = req.body

  try {
    if (await User.findOne({ email: email })) {
      return {
        status: 400,
        data: {
          message: "User already exists"
        }
      }
    }

    //TODO: Adicionar verificador de segurança de senha
    //Mínimo de X caracteres; as senhas devem conter pelo menos
    //X maiúsculas e X números ou caracteres especiais

    const user = await User.create({
      name: name,
      email: email,
      password: password
    })

    user.password = null as any
    const token = generateToken(user._id.toString())

    if (!token) {
      return {
        status: 400,
        data: {
          message: "Error generating token"
        }
      }
    }

    return {
      status: 200,
      data: {
        user: user,
        token: token
      }
    }
  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)
    return {
      status: 400,
      data: {
        message: "Error on create user"
      }
    }
  }
}