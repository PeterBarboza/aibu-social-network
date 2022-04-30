import { Request } from "express";

import { createPostService } from "../services/post/createPostService"
import { getPostsService } from "../services/post/getPostsService"
import { updatePostService } from "../services/post/updatePostService"
import { deletePostService } from "../services/post/deletePostService"

export async function createPostController(req: Request) {
  const result = await createPostService(req)

  return result
}

export async function getPostsController(req: Request) {
  const result = await getPostsService(req)

  return result
}

export async function updatePostController(req: Request) {
  const result = await updatePostService(req)

  return result
}

export async function deletePostController(req: Request) {
  const result = await deletePostService(req)

  return result
}