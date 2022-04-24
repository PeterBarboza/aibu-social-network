import { Request } from "express";

import { Comment } from "../../models/comment"
import { Post } from "../../models/post"

import { IResponseData } from "../../types/IResponses";
import { IUpdateComment } from "../../types/IComment";

//TODO: Pensar em uma forma de não permitir que uma pessoa que tenha acesso ao ID do autor
//de um comentário faça um update indevido
export async function updateCommentService(req: Request): Promise<IResponseData> {
  const { post_id, comment_id, content }: IUpdateComment = req.body
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
    if (!content || content.length === 0) {
      return {
        status: 400,
        data: {
          message: "content not provided"
        }
      }
    }
    if (!await Post.findOne({ _id: post_id })) {
      return {
        status: 400,
        data: {
          message: "Post non exists"
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

    const { modifiedCount } = await Comment.updateOne({ _id: comment_id, post_id: post_id, author_id: author_id }, { content: content })

    return {
      status: 200,
      data: {
        message: "Comment updated",
        modifiedCount: modifiedCount
      }
    }
  } catch (error) {
    //TODO: substituir por um de logger de produção
    console.error(error)

    return {
      status: 400,
      data: {
        message: "Error on update comment"
      }
    }
  }
}