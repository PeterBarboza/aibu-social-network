import { Schema, model } from "mongoose"

import { ILike } from "../types/ILike"

const likeSchema = new Schema<ILike>({
  post_id: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  }
})

const Like = model("like", likeSchema)

export { Like }
