import { Router } from "express";

import { createLikeController } from "../controllers/likeController"

const likeRouter = Router()

likeRouter.post("/create", async (req, res) => {
  const { status, data } = await createLikeController(req)

  res.status(status).json(data)
})

export { likeRouter }
