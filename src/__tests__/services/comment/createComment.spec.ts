import { Request } from "express"

import { createCommentService } from "../../../services/comment/createCommentService"
import { Post } from "../../../models/post"
import { User } from "../../../models/user"
import { Comment } from "../../../models/comment"

import mock from "../../mock/comment.json"

describe("Create post service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Happy path", () => {
    it("Should return post with status 200", async () => {
      Comment.create = jest.fn(() => Promise.resolve(mock.commentFullData) as any)
      User.findOne = jest.fn(() => Promise.resolve(true) as any)
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)

      const { data, status } = await createCommentService(mock.createCommentParam.success as unknown as Request)

      const spyPostFind = jest.spyOn(Post, "findOne")
      const spyUserFind = jest.spyOn(User, "findOne")
      const spyCommentCreate = jest.spyOn(Comment, "create")

      expect(spyUserFind).toHaveBeenCalledTimes(1)
      expect(spyPostFind).toHaveBeenCalledTimes(1)
      expect(spyCommentCreate).toHaveBeenCalledTimes(1)

      expect(data.comment).toMatchObject(mock.commentFullData)

      expect(status).toBe(200)
    })
  })
  describe("Unhappy path", () => {
    it("Should return 'Content field couldn't be empty' message with status 400", async () => {
      const { data, status } = await createCommentService(mock.createCommentParam.fail as unknown as Request)

      const spyPostFind = jest.spyOn(Post, "findOne")
      const spyUserFind = jest.spyOn(User, "findOne")
      const spyCommentCreate = jest.spyOn(Comment, "create")

      expect(spyUserFind).toHaveBeenCalledTimes(0)
      expect(spyPostFind).toHaveBeenCalledTimes(0)
      expect(spyCommentCreate).toHaveBeenCalledTimes(0)

      expect(data.message).toBe("Content field couldn't be empty")

      expect(status).toBe(400)
    })

    it("Should return 'Invalid user_id' message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await createCommentService(mock.createCommentParam.success as unknown as Request)

      const spyPostFind = jest.spyOn(Post, "findOne")
      const spyUserFind = jest.spyOn(User, "findOne")
      const spyCommentCreate = jest.spyOn(Comment, "create")

      expect(spyUserFind).toHaveBeenCalledTimes(1)
      expect(spyPostFind).toHaveBeenCalledTimes(0)
      expect(spyCommentCreate).toHaveBeenCalledTimes(0)

      expect(data.message).toBe("Invalid user_id")

      expect(status).toBe(400)
    })

    it("Should return 'Invalid post_id' message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(true) as any)
      Post.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await createCommentService(mock.createCommentParam.success as unknown as Request)

      const spyPostFind = jest.spyOn(Post, "findOne")
      const spyUserFind = jest.spyOn(User, "findOne")
      const spyCommentCreate = jest.spyOn(Comment, "create")

      expect(spyUserFind).toHaveBeenCalledTimes(1)
      expect(spyPostFind).toHaveBeenCalledTimes(1)
      expect(spyCommentCreate).toHaveBeenCalledTimes(0)

      expect(data.message).toBe("Invalid post_id")

      expect(status).toBe(400)
    })

    it("Should return a error object with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(true) as any)
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.create = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)

      const { data, status } = await createCommentService(mock.createCommentParam.success as unknown as Request)

      const spyPostFind = jest.spyOn(Post, "findOne")
      const spyUserFind = jest.spyOn(User, "findOne")
      const spyCommentCreate = jest.spyOn(Comment, "create")

      expect(spyUserFind).toHaveBeenCalledTimes(1)
      expect(spyPostFind).toHaveBeenCalledTimes(1)
      expect(spyCommentCreate).toHaveBeenCalledTimes(1)

      expect(data.message)

      expect(status).toBe(400)
    })
  })
})