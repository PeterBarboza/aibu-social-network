import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/verifyToken";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ data: { message: "No token provided" } })
  }

  const parts = authHeader.split(" ")

  if (parts.length !== 2) {
    return res.status(401).json({ data: { message: "Token error" } })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ data: { message: "Token malformatted" } })
  }

  const { _id } = verifyToken(token)

  if (!_id) {
    return res.status(401).json({ data: { message: "Invalid token" } })
  }

  req.headers._id = _id

  next()
}