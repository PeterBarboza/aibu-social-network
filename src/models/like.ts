import { Schema, model } from "mongoose"

import { ILike } from "../types/ILike"

const likeSchema = new Schema<ILike>({
  createdAt: {
    type: Number,
    required: true
  },
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
