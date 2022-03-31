import { sign } from "jsonwebtoken"
import "dotenv/config"

//TODO: Configurar dotenv para ambiente Local, Testes e de produção
//separadamente.
export function generateToken(_id: string): string | null {
  const secret = process.env.SECRET

  if (!_id || typeof _id !== "string") {
    return null
  }

  const token = sign({ _id: _id }, secret as string, {
    expiresIn: 86400
  })

  return token
}
