import { Request } from "express";

import { createCommentService } from "../services/comment/createCommentService"

export async function createLikeController(req: Request) {
  const result = await createCommentService(req)

  return result
}