import { Router } from "express"

import {
  createUserController,
  authUserController
} from "../controllers/userController"

const userRouter = Router()

userRouter.post("/register", async (req, res) => {
  const { status, data } = await createUserController(req)

  res.status(status).json(data)
})

userRouter.post("/authenticate", async (req, res) => {
  const { status, data } = await authUserController(req)

  res.status(status).json(data)
})

export { userRouter }