import { Schema, model } from "mongoose"

import { IPost } from "../types/IPost"

const postSchema = new Schema<IPost>({
  content: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Post = model("post", postSchema)

export { Post }
