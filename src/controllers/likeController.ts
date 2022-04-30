import { Request } from "express";

import { handleLikeService } from "../services/like/handleLikeService"
import { getLikesService } from "../services/like/getLikesService"

export async function handleLikeController(req: Request) {
  const result = await handleLikeService(req)

  return result
}

export async function getLikesController(req: Request) {
  const result = await getLikesService(req)

  return result
}