import { Request } from "express"

import { Comment } from "../../models/comment"
import { User } from "../../models/user"
import { Post } from "../../models/post"

import { IResponseData } from "../../types/IResponses"
import { ICreateCommentReqBody, ICreateCommentReqQS } from "../../types/IComment"
import { IReqHeader } from "../../types"

export async function createCommentService(req: Request): Promise<IResponseData> {
  const { content } = req.body as ICreateCommentReqBody
  const { post_id } = req.query as unknown as ICreateCommentReqQS
  const { _id } = req.headers as IReqHeader

  try {
    if (content.length < 1) {
      return {
        status: 400,
        data: {
          message: "Content field couldn't be empty"
        }
      }
    }
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

    const comment = await Comment.create({
      content: content,
      post_id: post_id,
      author_id: _id,
      createdAt: Date.now()
    })

    return {
      status: 200,
      data: {
        comment: comment
      }
    }

  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)
    return {
      status: 400,
      data: {
        message: "Error on create comment"
      }
    }
  }


}