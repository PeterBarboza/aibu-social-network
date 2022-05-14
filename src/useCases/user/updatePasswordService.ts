import { Request } from "express"
import { hash } from "bcryptjs"

import { User } from "../../models/user"
import { IReqHeader } from "../../types"

import { IUpdatePasswordReqBody } from "../../types/IUser"

export async function updatePasswordService(req: Request, authStatus: number, user_id: Object) {
  const { newPassword }: IUpdatePasswordReqBody = req.body
  const { _id } = req.headers as IReqHeader

  try {
    if (authStatus !== 200) {
      return {
        status: 400,
        data: {
          message: "unauthorized delete"
        }
      }
    }

    if (!_id || !user_id || user_id != _id) {
      return {
        status: 400,
        data: {
          message: "unauthorized delete"
        }
      }
    }

    if (newPassword.length < 6) {
      return {
        status: 400,
        data: {
          message: "This password is too short. It would have 6 characteres at least"
        }
      }
    }

    if (!await User.findOne({ _id: _id })) {
      return {
        status: 400,
        data: {
          message: "User non exists"
        }
      }
    }

    const safePassword = await hash(newPassword, 10)
    const { modifiedCount } = await User.updateOne({ _id: _id }, { password: safePassword })

    return {
      status: 200,
      data: {
        message: "Password successfull updated",
        modifiedCount: modifiedCount,
      }
    }

  } catch (error) {
    //TODO: sbusti...
    console.log(error)

    return {
      status: 400,
      data: {
        message: "Error on update user"
      }
    }
  }
}