import { Request } from "express"

import { User } from "../../models/user"

import { IReqHeader } from "../../types"
import { IUpdateUserReqBody } from "../../types/IUser"
import { IResponseData } from "../../types/IResponses"
import { IUploadImageToBucketResponse } from "../../types/IS3"

export async function updateUserService(req: Request): Promise<IResponseData> {
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

    const maybeCurrentUser = await User.findOne({ username: username })

    if (maybeCurrentUser && maybeCurrentUser._id.toString() != _id) {
      return {
        status: 400,
        data: {
          message: "username already in use"
        }
      }
    }

    const updateObject: IUpdateUserReqBody = {
      name: name,
      username: username,
      bio: bio
    }

    const { modifiedCount } = await User.updateOne({ _id: _id }, updateObject)

    return {
      status: 200,
      data: {
        message: "User updated",
        modifiedCount: modifiedCount
      }
    }

  } catch (error) {
    //TODO: substi...
    console.log(error)

    return {
      status: 400,
      data: {
        message: "Error on update user"
      }
    }
  }
}