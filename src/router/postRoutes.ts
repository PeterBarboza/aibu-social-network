import { Router } from "express";

import { createPostController } from "../controllers/postController"

const postRouter = Router()

postRouter.post("/create", async (req, res) => {
  const { status, data } = await createPostController(req)

  res.status(status).json(data)
})

export { postRouter }
