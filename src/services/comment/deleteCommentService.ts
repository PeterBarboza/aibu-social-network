import { Request } from "express";

import { Comment } from "../../models/comment"
import { Post } from "../../models/post"

import { IResponseData } from "../../types/IResponses";
import { IDeleteComment } from "../../types/IComment";

export async function deleteCommentService(req: Request): Promise<IResponseData> {
  const { post_id, comment_id }: IDeleteComment = req.body
  const author_id = req.headers._id as string

  try {
    if (!post_id) {
      return {
        status: 400,
        data: {
          message: "post_id not provided"
        }
      }
    }
    if (!comment_id) {
      return {
        status: 400,
        data: {
          message: "comment_id not provided"
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
    if (!await Comment.findOne({ _id: comment_id, post_id: post_id, author_id: author_id })) {
      return {
        status: 400,
        data: {
          message: "Comment non exists"
        }
      }
    }

    const { deletedCount } = await Comment.remove({ _id: comment_id, post_id: post_id, author_id: author_id })

    return {
      status: 200,
      data: {
        message: "Comment deleted",
        deletedCount: deletedCount
      }
    }
  } catch (error) {
    //TODO: substituir por um de logger de produção
    console.error(error)

    return {
      status: 400,
      data: {
        message: "Error on delete comment"
      }
    }
  }
}