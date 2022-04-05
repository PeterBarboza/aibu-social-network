import { Request } from "express";

import { Post } from "../../models/post"
import { User } from "../../models/user"

import { IResponseData } from "../../types/IResponses";

export async function createPostService(req: Request): Promise<IResponseData> {
  const { content } = req.body
  const author_id = req.headers._id as string

  try {
    if (!await User.findOne({ _id: author_id })) {
      return {
        status: 400,
        data: {
          message: "Invalid user_id not found"
        }
      }
    }

    const post = await Post.create({
      content: content,
      author_id: author_id,
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