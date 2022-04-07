import { sign } from "jsonwebtoken"
import "dotenv/config"

//TODO: Configurar dotenv para ambiente Local, Testes e de produção
//separadamente.
export function generateToken(_id: string): string | null {
  const secret = process.env.SECRET

  if (!_id || !_id.toString) {
    return null
  }

  const string_id = _id.toString()

  const token = sign({ _id: string_id }, secret as string, {
    expiresIn: 86400
  })

  return token
}
