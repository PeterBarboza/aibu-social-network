import { Request } from "express";

import { Like } from "../../models/like"
import { User } from "../../models/user"
import { Post } from "../../models/post"

import { IResponseData } from "../../types/IResponses";

export async function createLikeService(req: Request): Promise<IResponseData> {
  const { post_id } = req.body
  const author_id = req.headers._id as string

  try {
    if (!await User.findOne({ _id: author_id })) {
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
    if (!await Like.findOne({ post_id: post_id, author_id: author_id })) {
      return {
        status: 400,
        data: {
          message: "Like already exists"
        }
      }
    }

    const like = await Like.create({
      createdAt: Date.now(),
      post_id: post_id,
      author_id: author_id
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