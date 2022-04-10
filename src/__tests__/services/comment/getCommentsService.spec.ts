import { Request } from "express"

import { getCommentsService } from "../../../services/comment/getCommentsService"
import { Comment } from "../../../models/comment"
import { Post } from "../../../models/post"

import mock from "../../mock/comment.json"

//TODO: Terminar testes do getCommentsService
describe("Get comments service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

})