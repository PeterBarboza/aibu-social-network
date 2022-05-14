import { Request } from "express"

import { createUserService } from "../useCases/user/createUserService"
import { authUserService } from "../useCases/user/authUserService"
import { updateUserService } from "../useCases/user/updateUserService"
import { deleteUserService } from "../useCases/user/deleteUserService"
import { updatePasswordService } from "../useCases/user/updatePasswordService"

import { uploadImageToBucket } from "../services/uploadImageToBucket"

export async function createUserController(req: Request) {
  const result = await createUserService(req)

  return result
}

export async function authUserController(req: Request) {
  const result = await authUserService(req)

  return result
}

export async function getUserProfileController(req: Request) {
  const result = await getUserProfileService(req)

  return result
}

export async function updateUserController(req: Request) {
  const uploadImageToBucketResponse = await uploadImageToBucket(req)

  const result = await updateUserService(req, uploadImageToBucketResponse)

  return result
}

export async function deleteUserController(req: Request) {
  const { data, status } = await authUserService(req)

  const result = await deleteUserService(req, status, data.user?._id)

  return result
}

export async function updatePasswordController(req: Request) {
  const { data, status } = await authUserService(req)

  const result = await updatePasswordService(req, status, data.user?._id)

  return result
}