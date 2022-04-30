import { Router } from "express"

import {
  createUserController,
  authUserController,
  updateUserController,
  deleteUserController,
  updatePasswordController
} from "../controllers/userController"

const authUserRouter = Router()
authUserRouter.post("/register", async (req, res) => {
  const { status, data } = await createUserController(req)

  res.status(status).json(data)
})
authUserRouter.post("/authenticate", async (req, res) => {
  const { status, data } = await authUserController(req)

  res.status(status).json(data)
})

const userRouter = Router()
userRouter.patch("/updateProfile", async (req, res) => {
  const { data, status } = await updateUserController(req)

  res.status(status).json(data)
})
userRouter.post("/delete", async (req, res) => {
  const { data, status } = await deleteUserController(req)

  res.status(status).json(data)
})
userRouter.patch("/updatePassword", async (req, res) => {
  const { data, status } = await updatePasswordController(req)

  res.status(status).json(data)
})

export { authUserRouter, userRouter }