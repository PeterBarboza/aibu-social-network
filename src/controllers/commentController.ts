import { Request } from "express";

import { createCommentService } from "../services/comment/createCommentService"
import { getCommentsService } from "../services/comment/getCommentsService"
import { deleteCommentService } from "../services/comment/deleteCommentService"

export async function createCommentController(req: Request) {
  const result = await createCommentService(req)

  return result
}

export async function getCommentsController(req: Request) {
  const result = await getCommentsService(req)

  return result
}

export async function deleteCommentController(req: Request) {
  const result = await deleteCommentService(req)

  return result
}