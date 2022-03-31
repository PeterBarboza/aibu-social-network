import { Request } from "express"
import { compare } from "bcryptjs"

import { User } from "../../models/user"
import { generateToken } from "../../utils/generateToken"

import { IResponseData, IUserLogin } from "../../types/IUser"

export async function authUserService(req: Request): Promise<IResponseData> {
  const { email, password }: IUserLogin = req.body

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

  user.password = undefined as any
  const token = generateToken(user._id.toString())

  return {
    status: 200,
    data: {
      user: user,
      token: token
    }
  }
}