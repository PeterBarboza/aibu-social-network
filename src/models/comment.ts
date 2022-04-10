import { Schema, model } from "mongoose"

import { IComment } from "../types/IComment"

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },
  post_id: {
    type: String,
    required: true
  }
})

const Comment = model("comment", commentSchema)

export { Comment }
