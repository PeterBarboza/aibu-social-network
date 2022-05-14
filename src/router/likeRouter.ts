import { Router } from "express"

import { handleLikeController, getLikesController } from "../controllers/likeController"

const likeRouter = Router()

likeRouter.post("/handle", async (req, res) => {
  const { status, data } = await handleLikeController(req)

  res.status(status).json(data)
})
likeRouter.get("/get", async (req, res) => {
  const { status, data } = await getLikesController(req)

  res.status(status).json(data)
})

export { likeRouter }
