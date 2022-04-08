import { Request } from "express"
import { compare } from "bcryptjs"

import { User } from "../../models/user"
import { generateToken } from "../../utils/generateToken"

import { IUserLogin } from "../../types/IUser"
import { IResponseData } from "../../types/IResponses"

export async function authUserService(req: Request): Promise<IResponseData> {
  const { email, password }: IUserLogin = req.body

  try {
    const user = await User.findOne({ email: email }).select("+password")

    if (!user) {
      return {
        status: 400,
        data: {
          message: "User not found"
        }
      }
    }

    if (!await compare(password, user.password)) {
      return {
        status: 400,
        data: {
          message: "Invalid password"
        }
      }
    }

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
        message: "Error on auth user"
      }
    }
  }
}