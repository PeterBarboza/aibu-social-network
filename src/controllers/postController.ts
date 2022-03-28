import { Request } from "express";

import { createPostService } from "../services/post/createPostService"

export async function createPostController(req: Request) {
  const result = await createPostService(req)

  return result
}