import { Router } from "express"
import { Writable, Readable, pipeline } from "stream"
import { promisify } from "util"

import {
  createUserController,
  authUserController,
  updateUserController,
  deleteUserController,
  updatePasswordController
} from "../controllers/userController"

import { upload } from "../middlewares/uploadImage"

//TODO: Exclude next line
import { uploadImageToBucket } from "../services/uploadImageToBucket"
import { getImageFromBucket } from "../services/getImageFromBucket"

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
userRouter.get("/getUserProfile", async (req, res) => {
  const { hasFile, data } = await getImageFromBucket(req)

  if (!data) return res.send("nothing")

  data.imgStream.pipe(res)



})
userRouter.put("/updateProfile", upload.single("image"), async (req, res) => {
  const { data, status } = await updateUserController(req)

  res.status(status).json(data)
})
userRouter.post("/delete", async (req, res) => {
  const { data, status } = await deleteUserController(req)

  res.status(status).json(data)
})
userRouter.post("/updatePassword", async (req, res) => {
  const { data, status } = await updatePasswordController(req)

  res.status(status).json(data)
})

//TODO: Exclude test route
userRouter.post("/test", upload.single("image"), async (req, res) => {
  const { data, hasFile } = await uploadImageToBucket(req)

  res.json({ hasFile: hasFile, data: data })
})

export { authUserRouter, userRouter }