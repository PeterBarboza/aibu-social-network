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

    const user = await User.create({
      name: name,
      email: email,
      password: password
    })

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
  } catch (err) {
    return {
      status: 400,
      data: err
    }
  }
}