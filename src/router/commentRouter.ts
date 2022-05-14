import { Router } from "express"

import {
  createCommentController,
  getCommentsController,
  deleteCommentController,
  updateCommentController
} from "../controllers/commentController"

const commentRouter = Router()

commentRouter.post("/create", async (req, res) => {
  const { status, data } = await createCommentController(req)

  res.status(status).json(data)
})
commentRouter.get("/get", async (req, res) => {
  const { status, data } = await getCommentsController(req)

  res.status(status).json(data)
})

commentRouter.delete("/delete", async (req, res) => {
  const { status, data } = await deleteCommentController(req)

  res.status(status).json(data)
})

commentRouter.patch("/update", async (req, res) => {
  const { status, data } = await updateCommentController(req)

  res.status(status).json(data)
})

export { commentRouter }
