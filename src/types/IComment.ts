export interface IComment {
  content: string
  createdAt: number
  author_id: string
  post_id: string
}

export interface ICreateCommentReqBody {
  content: string
}
export interface ICreateCommentReqQS {
  post_id: string
}

export interface IDeleteCommentReqQS {
  post_id: string
  comment_id: string
}

export interface IUpdateComment {
  post_id: string
  comment_id: string
  content: string
}