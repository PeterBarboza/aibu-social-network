import { Request } from "express";

import { createLikeService } from "../services/like/createLikeService"
import { getLikesService } from "../services/like/getLikesService"

export async function createLikeController(req: Request) {
  const result = await createLikeService(req)

  return result
}

export async function getLikesController(req: Request) {
  const result = await getLikesService(req)

  return result
}