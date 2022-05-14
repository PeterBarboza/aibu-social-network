import { Request } from "express"

import { Like } from "../../models/like"
import { Post } from "../../models/post"

import { IResponseData } from "../../types/IResponses"

export async function getLikesService(req: Request): Promise<IResponseData> {
  const { post_id } = req.query

  try {
    if (!await Post.findOne({ _id: post_id })) {
      return {
        status: 400,
        data: {
          message: "invalid post_id"
        }
      }
    }

    const likesCount = await Like.countDocuments({ post_id: post_id })

    return {
      status: 200,
      data: {
        likesCount: likesCount
      }
    }

  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)
    return {
      status: 400,
      data: {
        message: "Error on get likes"
      }
    }
  }
}