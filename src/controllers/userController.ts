import { Request } from "express"

import { createUserService } from "../services/user/createUserService"
import { authUserService } from "../services/user/authUserService"

export async function createUserController(req: Request) {
  const result = await createUserService(req)

  return result
}

export async function authUserController(req: Request) {
  const result = await authUserService(req)

  return result
}