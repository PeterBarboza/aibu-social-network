import { Router } from "express";

import { createCommentController, getCommentsController } from "../controllers/commentController"

const commentRouter = Router()

commentRouter.post("/create", async (req, res) => {
  const { status, data } = await createCommentController(req)

  res.status(status).json(data)
})
commentRouter.get("/getComments", async (req, res) => {
  const { status, data } = await getCommentsController(req)

  res.status(status).json(data)
})

export { commentRouter }
