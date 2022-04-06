import { Request } from "express";
import { Post } from "../../models/post";

import { IResponseData } from "../../types/IResponses";

import "dotenv/config"

export async function getPostsService(req: Request): Promise<IResponseData> {
  //TODO: Decidir como irei capturar o unixDate do client sem que haja
  //um bug em casos de fuso-horário diferente do servidor
  //Possibilidade: Adicionar campo "lastConnectionAt: ..." no User Model
  //Assim que o usuário se conectar ao webSocket do frontEnd, disparar
  //um evento de conexão que vai setar o valor do lastConnectionAt com um
  //Date.now() no servidor e esse será o valor de referência para buscar o feed

  const { unixDate, limit } = req.query
  const apiUrl = process.env.API_URL

  try {
    if (unixDate) {
      if (unixDate.length !== 13) {
        return {
          status: 400,
          data: {
            message: "unixData format invalid. It must be 13 characters long"
          }
        }
      }
      if (/[a-z]/i.test(unixDate as string)) {
        return {
          status: 400,
          data: {
            message: "unixData format invalid. It must contain numbers only"
          }
        }
      }

      const unixDateNumber = Number(unixDate)

      //Essa query busca todos os posts; criados antes do unixDateNumber; trás os mais recentes; porém o limite é "limit"
      const postsArray = await Post.find().gt('createdAt', unixDateNumber).sort({ createdAt: -1 }).limit(limit as unknown as number)

      if (postsArray.length < Number(limit)) {
        return {
          status: 200,
          data: {
            posts: postsArray,
            next: "finish"
          }
        }
      }

      const lastPostCreatedAtValue = postsArray[postsArray.length - 1].createdAt.toString()

      return {
        status: 200,
        data: {
          posts: postsArray,
          next: `${apiUrl}/post/getFeed?unixDate=${lastPostCreatedAtValue}&limit=${limit || false}`
        }
      }
    }
    const postsLimit = limit as unknown as number || 10

    //Essa query busca todos os posts; trás os mais recentes; porém o limite é "limit"
    const postsArray = await Post.find().sort({ createdAt: -1 }).limit(postsLimit)

    if (postsArray.length < postsLimit) {
      return {
        status: 200,
        data: {
          posts: postsArray,
          next: "finish"
        }
      }
    }

    const lastPostCreatedAtValue = postsArray[postsArray.length - 1].createdAt.toString()

    return {
      status: 200,
      data: {
        posts: postsArray,
        next: `${apiUrl}/post/getFeed?unixDate=${lastPostCreatedAtValue}&limit=${limit || false}`
      }
    }

  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)
    return {
      status: 400,
      data: {
        message: "Error on get posts"
      }
    }
  }
}