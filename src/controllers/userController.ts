import { Request } from "express"

import { createUserService } from "../services/user/createUserService"
import { authUserService } from "../services/user/authUserService"
import { updateUserService } from "../services/user/updateUserService"
import { deleteUserService } from "../services/user/deleteUserService"
import { updatePasswordService } from "../services/user/updatePasswordService"

export async function createUserController(req: Request) {
  const result = await createUserService(req)

  return result
}

export async function authUserController(req: Request) {
  const result = await authUserService(req)

  return result
}

export async function updateUserController(req: Request) {
  const result = await updateUserService(req)

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