import { Request } from "express"
import { hash } from "bcryptjs"

import { User } from "../../models/user"
import { generateToken } from "../../utils/generateToken"

import { ICreateUserReqBody, IUser } from "../../types/IUser"
import { IResponseData } from "../../types/IResponses"
import { IUploadImageToBucketResponse } from "../../types/IS3"


export async function createUserService(req: Request): Promise<IResponseData> {
  const { name, email, password, bio, username }: ICreateUserReqBody = req.body

  try {
    if (!name || name.length < 1) {
      return {
        status: 400,
        data: {
          message: "name not provided"
        }
      }
    }

    if (!username || username.length < 1) {
      return {
        status: 400,
        data: {
          message: "username not provided"
        }
      }
    }

    //TODO:Adicionar verificação pra ver se o endereço de email é real
    if (!email || email.length < 1) {
      return {
        status: 400,
        data: {
          message: "email not provided"
        }
      }
    }

    if (await User.findOne({ username: username })) {
      return {
        status: 400,
        data: {
          message: "username already in use"
        }
      }
    }

    /*
    //TODO: Crie uma verificação para ver se o email existe ou não
    if(email...) {...}
    */

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

    const safePassword = await hash(password, 10)

    const creationObject: IUser = {
      name: name,
      email: email,
      password: safePassword,
      username: username,
      bio: bio || "",
      createdAt: Date.now()
    }

    const user = await User.create(creationObject)

    user.password = null as any
    const token = generateToken(user._id as unknown as string)

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