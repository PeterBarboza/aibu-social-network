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

  const unixDateQS = req.query.unixDate as string
  const apiUrl = process.env.API_URL

  try {
    if (!unixDateQS) {
      return {
        status: 400,
        data: {
          message: "unixData query param is ausent"
        }
      }
    }
    if (unixDateQS.length !== 13) {
      return {
        status: 400,
        data: {
          message: "unixData format invalid. It must be 13 characters long"
        }
      }
    }
    if (/[a-z]/i.test(unixDateQS)) {
      return {
        status: 400,
        data: {
          message: "unixData format invalid. It must contain numbers only"
        }
      }
    }

    const unixDateNumber = Number(unixDateQS)
    const postsLimit = 10

    const postsArray = await Post.find().gt('createdAt', unixDateNumber).limit(postsLimit)

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
        next: `${apiUrl}/post/getFeed?unixDate=${lastPostCreatedAtValue}`
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