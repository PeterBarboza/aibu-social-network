import { Request } from "express";

import { createLikeService } from "../services/postData/like/createLikeService"

export async function createLikeController(req: Request) {
  const result = await createLikeService(req)

  return result
}