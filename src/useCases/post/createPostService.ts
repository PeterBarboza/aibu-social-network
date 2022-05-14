import { Request } from "express"

import { Post } from "../../models/post"
import { User } from "../../models/user"

import { IResponseData } from "../../types/IResponses"
import { IReqHeader } from "../../types"

export async function createPostService(req: Request): Promise<IResponseData> {
  const { content } = req.body
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

    const post = await Post.create({
      content: content,
      author_id: _id,
      createdAt: Date.now()
    })

    return {
      status: 200,
      data: {
        post: post,
      }
    }
  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)
    return {
      status: 400,
      data: {
        message: "Error on create post"
      }
    }
  }
}