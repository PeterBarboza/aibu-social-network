import { Request } from "express";

import { createCommentService } from "../services/postData/comment/createCommentService"
import { getCommentsService } from "../services/postData/comment/getCommentsService"

export async function createCommentController(req: Request) {
  const result = await createCommentService(req)

  return result
}

export async function getCommentsController(req: Request) {
  const result = await getCommentsService(req)

  return result
}