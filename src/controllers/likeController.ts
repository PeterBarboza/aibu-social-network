import { Request } from "express";

import { createLikeService } from "../services/postData/like/createLikeService"
import { getLikesService } from "../services/postData/like/getLikesService"

export async function createLikeController(req: Request) {
  const result = await createLikeService(req)

  return result
}

export async function getLikesController(req: Request) {
  const result = await getLikesService(req)

  return result
}