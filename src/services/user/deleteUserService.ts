import { Request } from "express"

import { User } from "../../models/user"
import { IReqHeader } from "../../types"

export async function deleteUserService(req: Request, authStatus: number, user_id: string) {
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

    if (!await User.findOne({ _id: _id })) {
      return {
        status: 400,
        data: {
          message: "User non exists"
        }
      }
    }

    const { deletedCount } = await User.deleteOne({ _id: _id })

    req.headers._id = undefined
    req.headers.authorization = undefined

    return {
      status: 200,
      data: {
        message: "User deleted",
        deletedCount: deletedCount
      }
    }

  } catch (error) {
    //TODO: sbusti...
    console.log(error)

    return {
      status: 400,
      data: {
        message: "Error on delete user"
      }
    }
  }
}