import { Request } from "express"

import { User } from "../../models/user"
import { IReqHeader } from "../../types"

import { IUpdateUserReqBody } from "../../types/IUser"

export async function updateUserService(req: Request) {
  const { name, username, bio }: IUpdateUserReqBody = req.body
  const { _id } = req.headers as IReqHeader

  try {
    if (name.length < 1) {
      return {
        status: 400,
        data: {
          message: "name length can't be lesser than 1"
        }
      }
    }

    if (username.length < 1) {
      return {
        status: 400,
        data: {
          message: "username length can't be lesser than 1"
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

    const { modifiedCount } = await User.updateOne({ _id: _id }, { name: name, username: username, bio: bio } as IUpdateUserReqBody)

    return {
      status: 200,
      data: {
        message: "User updated",
        modifiedCount: modifiedCount
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