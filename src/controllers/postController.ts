import { Request } from "express";

import { createPostService } from "../services/post/createPostService"
import { getPostsService } from "../services/post/getPostsService"

export async function createPostController(req: Request) {
  const result = await createPostService(req)

  return result
}

export async function getPostsController(req: Request) {
  const result = await getPostsService(req)

  return result
}