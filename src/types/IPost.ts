export interface IPost {
  content: string
  createdAt: number
  author_id: string
}

export interface IUpdatePost {
  content: string
  post_id: string
  author_id: string
}