import { Request } from "express"

import { Comment } from "../../../models/comment"
import { Post } from "../../../models/post"

import { IResponseData } from "../../../types/IResponses"

export async function getCommentsService(req: Request): Promise<IResponseData> {
  const { post_id } = req.body
  const { unixDate, limit } = req.query
  const apiUrl = process.env.API_URL
  const commentsLimit = limit as any > 0 ? Number(limit) : 10

  try {
    if (!await Post.findOne({ _id: post_id })) {
      return {
        status: 400,
        data: {
          message: "Invalid post_id"
        }
      }
    }

    if (unixDate) {
      if (unixDate.length !== 13) {
        return {
          status: 400,
          data: {
            message: "unixData format invalid. It must be 13 characters long"
          }
        }
      }
      if (/[a-z]/i.test(unixDate as string)) {
        return {
          status: 400,
          data: {
            message: "unixData format invalid. It must contain numbers only"
          }
        }
      }

      const unixDateNumber = Number(unixDate)

      const commentsArray = await Comment.find({ post_id: post_id }).lt("createdAt", unixDateNumber).sort({ createdAt: -1 }).limit(commentsLimit)

      if (commentsArray.length < Number(commentsLimit)) {
        return {
          status: 200,
          data: {
            comments: commentsArray,
            next: "finish"
          }
        }
      }

      const lastCommentCreatedAtValue = commentsArray[commentsArray.length - 1].createdAt.toString()

      return {
        status: 200,
        data: {
          comments: commentsArray,
          next: `${apiUrl}/comment/getComments?unixDate=${lastCommentCreatedAtValue}&limit=${commentsLimit}`
        }
      }
    }

    const commentsArray = await Comment.find({ post_id: post_id }).sort({ createdAt: -1 }).limit(commentsLimit)

    if (commentsArray.length < Number(commentsLimit)) {
      return {
        status: 200,
        data: {
          comments: commentsArray,
          next: "finish"
        }
      }
    }

    const lastCommentCreatedAtValue = commentsArray[commentsArray.length - 1].createdAt.toString()

    return {
      status: 200,
      data: {
        comments: commentsArray,
        next: `${apiUrl}/comment/getComments?unixDate=${lastCommentCreatedAtValue}&limit=${commentsLimit}`
      }
    }
  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)
    return {
      status: 400,
      data: {
        message: "Error on get comments"
      }
    }
  }
}
