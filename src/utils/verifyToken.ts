import { verify } from "jsonwebtoken"
import "dotenv/config"

interface IPayload {
  _id: string
}

export function verifyToken(token: string) {
  const secret = process.env.SECRET as string

  try {
    const { _id } = verify(token, secret) as IPayload

    return {
      _id: _id
    }
  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)

    return {
      _id: null
    }
  }
}