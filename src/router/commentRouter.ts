import { Router } from "express";

import { createLikeController } from "../controllers/commentController"

const commentRouter = Router()

commentRouter.post("/create", async (req, res) => {
  const { status, data } = await createLikeController(req)

  res.status(status).json(data)
})

export { commentRouter }
