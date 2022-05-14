import { Request } from "express"

import { Post } from "../../models/post"

import { IResponseData } from "../../types/IResponses"
import { IUpdatePost } from "../../types/IPost"
import { IReqHeader } from "../../types"

//TODO: Trocar o status das requisições de todos os serviços para o tipo de status
//ideal, e não apenas o 400 de bad request
//TODO: Pensar em uma forma de não permitir que uma pessoa que tenha acesso ao ID do autor
//de um post faça um update indevido
export async function updatePostService(req: Request): Promise<IResponseData> {
  const { post_id } = req.query as unknown as IUpdatePost
  const { content } = req.body
  const { _id } = req.headers as IReqHeader

  try {
    if (!post_id) {
      return {
        status: 400,
        data: {
          message: "post_id not provided"
        }
      }
    }
    if (!content || content.length === 0) {
      return {
        status: 400,
        data: {
          message: "content not provided"
        }
      }
    }

    const post = await Post.findOne({ _id: post_id })

    if (!post) {
      return {
        status: 400,
        data: {
          message: "Post non exists"
        }
      }
    }
    if (post?.author_id !== _id) {
      return {
        status: 400,
        data: {
          message: "unauthorized update"
        }
      }
    }

    const { modifiedCount } = await Post.updateOne({ _id: post_id, author_id: _id }, { content: content })

    return {
      status: 200,
      data: {
        message: "post updated",
        modifiedCount: modifiedCount
      }
    }

  } catch (error) {
    //TODO: Substituir por um logger de produção
    console.error(error)

    return {
      status: 400,
      data: {
        message: "Error on update post"
      }
    }
  }
}