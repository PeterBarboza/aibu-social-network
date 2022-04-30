import { Request } from "express"

import { updateCommentService } from "../../../services/comment/updateCommentService"
import { Comment } from "../../../models/comment"
import { Post } from "../../../models/post"

import mock from "../../mock/comment.json"

describe("Update comment service", () => {
  describe("Happy path", () => {
    it("Should return", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.updateOne = jest.fn(() => Promise.resolve({ modifiedCount: 1 }) as any)

      const { data, status } = await updateCommentService(mock.updateCommentParams.success as unknown as Request)

      console.log(data, status)

      expect(data.message).toBe("Comment updated")
      expect(data.modifiedCount).toBe(1)
      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    const {
      post_idNotProvided,
      comment_idNotProvided,
      contentNotProvided } = mock.updateCommentParams.fail

    it("Should return 'post_id not provided' message with status 400", async () => {
      const { data, status } = await updateCommentService(post_idNotProvided as unknown as Request)

      expect(data.message).toBe("post_id not provided")
      expect(status).toBe(400)
    })

    it("Should return 'comment_id not provided' message with status 400", async () => {
      const { data, status } = await updateCommentService(comment_idNotProvided as unknown as Request)

      expect(data.message).toBe("comment_id not provided")
      expect(status).toBe(400)
    })

    it("Should return 'content not provided' message with status 400", async () => {
      const { data, status } = await updateCommentService(contentNotProvided as unknown as Request)

      expect(data.message).toBe("content not provided")
      expect(status).toBe(400)
    })

    it("Should return 'Post non exists' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await updateCommentService(mock.updateCommentParams.success as unknown as Request)

      expect(data.message).toBe("Post non exists")
      expect(status).toBe(400)
    })

    it("Should return 'Comment non exists' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await updateCommentService(mock.updateCommentParams.success as unknown as Request)

      expect(data.message).toBe("Comment non exists")
      expect(status).toBe(400)
    })

    it("Should return a error object with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.updateOne = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)

      const { data, status } = await updateCommentService(mock.updateCommentParams.success as unknown as Request)

      expect(data.message)
      expect(status).toBe(400)
    })
  })
})