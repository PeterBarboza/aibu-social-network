import { Router } from "express"

import {
  createUserController,
  authUserController,
  updateUserController,
  deleteUserController,
  updatePasswordController,
  getUserProfileController,
  updateProfileImageController
} from "../controllers/userController"

import { upload } from "../middlewares/uploadImage"

//TODO: Testar updateUserService e afins
//TODO: Add uploadImageToBucket On createUserService
import { uploadImageToBucket } from "../services/uploadImageToBucket"
import { getImageFromBucket } from "../services/getImageFromBucket"
import { Field } from "multer"

const createFields: Field[] = [
  {
    name: "name",
    maxCount: 1
  },
  {
    name: "username",
    maxCount: 1
  },
  {
    name: "email",
    maxCount: 1
  },
  {
    name: "bio",
    maxCount: 1
  },
  {
    name: "password",
    maxCount: 1
  },
  {
    name: "image",
    maxCount: 1
  }
]
const updateFields: Field[] = [
  {
    name: "name",
    maxCount: 1
  },
  {
    name: "username",
    maxCount: 1
  },
  {
    name: "bio",
    maxCount: 1
  },
  {
    name: "image",
    maxCount: 1
  }
]

const authUserRouter = Router()
authUserRouter.post("/register", async (req, res) => {
  const { data, status } = await createUserController(req)

  res.status(status).json(data)
})
authUserRouter.post("/authenticate", async (req, res) => {
  const { status, data } = await authUserController(req)

  res.status(status).json(data)
})

const userRouter = Router()
userRouter.get("/images/:imgKey", async (req, res) => {
  const { data, hasFile } = await getImageFromBucket(req.params.imgKey)

  if (!hasFile || !data) return res.json({ hasFile: hasFile })

  data.imgStream.pipe(res)
})
userRouter.post("/uploadImage", upload.single("image"), async (req, res) => {
  const { data, hasFile } = await updateProfileImageController(req)

  res.status(200).json({ data, hasFile })
})
userRouter.get("/getUserProfile", async (req, res) => {
  const { data, status } = await getUserProfileController(req)

  res.status(status).json(data)
})
userRouter.patch("/updateProfile", upload.fields(updateFields), async (req, res) => {
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