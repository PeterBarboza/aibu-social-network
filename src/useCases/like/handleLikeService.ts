import { Request } from "express"

import { Like } from "../../models/like"
import { User } from "../../models/user"
import { Post } from "../../models/post"

import { IResponseData } from "../../types/IResponses"
import { IReqHeader } from "../../types"

//TODO: Pensar em uma forma de não permitir que uma pessoa que tenha acesso ao ID do autor
//de um like faça uma ação indevida
export async function handleLikeService(req: Request): Promise<IResponseData> {
  const { post_id } = req.query
  const { _id } = req.headers as IReqHeader

  try {
    if (!await User.findOne({ _id: _id })) {
      return {
        status: 400,
        data: {
          message: "Invalid user_id"
        }
      }
    }
    if (!await Post.findOne({ _id: post_id })) {
      return {
        status: 400,
        data: {
          message: "Invalid post_id"
        }
      }
    }
    const hasLike = await Like.findOne({ post_id: post_id, author_id: _id })
    if (hasLike) {
      const { deletedCount } = await Like.deleteOne({ _id: hasLike._id })

      return {
        status: 200,
        data: {
          message: "Like removed",
          deletedCount: deletedCount
        }
      }
    }

    const like = await Like.create({
      createdAt: Date.now(),
      post_id: post_id,
      author_id: _id
    })

    if (!like) {
      return {
        status: 400,
        data: {
          message: "Error on create like"
        }
      }
    }

    return {
      status: 200,
      data: {
        like: like
      }
    }
  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)
    return {
      status: 400,
      data: {
        message: "Error on create like"
      }
    }
  }
}