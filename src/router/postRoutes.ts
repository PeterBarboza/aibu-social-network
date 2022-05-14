import { Router } from "express"

import { createPostController, getPostsController, updatePostController, deletePostController } from "../controllers/postController"

const postRouter = Router()

postRouter.post("/create", async (req, res) => {
  const { status, data } = await createPostController(req)

  res.status(status).json(data)
})

postRouter.get("/get", async (req, res) => {
  const { data, status } = await getPostsController(req)

  res.status(status).json(data)
})

postRouter.patch("/update", async (req, res) => {
  const { data, status } = await updatePostController(req)

  res.status(status).json(data)
})

postRouter.delete("/delete", async (req, res) => {
  const { data, status } = await deletePostController(req)

  res.status(status).json(data)
})

export { postRouter }
