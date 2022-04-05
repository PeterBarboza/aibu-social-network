import { Router } from "express";

import { createPostController, getPostsController } from "../controllers/postController"

const postRouter = Router()

postRouter.post("/create", async (req, res) => {
  const { status, data } = await createPostController(req)

  res.status(status).json(data)
})

postRouter.get("/getFeed", async (req, res) => {
  const { data, status } = await getPostsController(req)

  res.status(status).json(data)
})

export { postRouter }
