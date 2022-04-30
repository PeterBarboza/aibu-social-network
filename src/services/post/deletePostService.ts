import { Request } from "express";

import { Post } from "../../models/post";
import { IDeletePost } from "../../types/IPost";
import { IReqHeader } from "../../types";

export async function deletePostService(req: Request) {
  const { post_id } = req.query as unknown as IDeletePost
  const { _id } = req.headers as IReqHeader

  try {
    if (!post_id) {
      return {
        status: 400,
        data: {
          message: "post_id not provided"
        }
      }
    }

    const post = await Post.findOne({ _id: post_id })

    if (!post) {
      return {
        status: 400,
        data: {
          message: "Post non exists"
        }
      }
    }

    if (post?.author_id !== _id) {
      return {
        status: 400,
        data: {
          message: "unauthorized delete"
        }
      }
    }

    const { deletedCount } = await Post.deleteOne({ _id: post_id })

    return {
      status: 200,
      data: {
        message: "post deleted",
        deletedCount: deletedCount
      }
    }
  } catch (error) {
    //TODO: Substituir por um logger de produção
    console.error(error)

    return {
      status: 400,
      data: {
        message: "Error on delete post"
      }
    }
  }
}