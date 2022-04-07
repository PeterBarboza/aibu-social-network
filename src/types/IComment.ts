export interface IComment {
  content: string
  createdAt: number
  author_id: string
  post_id: string
}

export interface ICreateComment {
  content: string
  post_id: string
}