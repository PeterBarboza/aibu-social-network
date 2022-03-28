import { Request } from "express";

import { Post } from "../../models/post"
import { User } from "../../models/user"

import { IPost } from "../../types/IPost";
import { IResponseData } from "../../types/IUser";

//TODO: Implementar verificação JWT, para saber se é realmente o usuário
//que está tentando fazer o post.
export async function createPostService(req: Request): Promise<IResponseData> {
  const { content, author_id }: IPost = req.body

  //...JWT Verify...//

  try {
    if (!await User.findById(author_id)) {
      return {
        status: 400,
        data: {
          message: "Invalid user_id not found"
        }
      }
    }

    const post = await Post.create({
      content: content,
      author_id: author_id,
    })

    return {
      status: 200,
      data: {
        post: post,
      }
    }
  } catch (err) {
    return {
      status: 400,
      data: err
    }
  }
}