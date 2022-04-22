import { Request } from "express"

import { deleteCommentService } from "../../../services/comment/deleteCommentService"
import { Comment } from "../../../models/comment"
import { Post } from "../../../models/post"

import mock from "../../mock/comment.json"

describe("Delete comment service", () => {
  describe("Happy path", () => {
    it("Should return 'Comment deleted' message and deletedCount === 1, with status 200", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.remove = jest.fn(() => Promise.resolve({ deletedCount: 1 }) as any)

      const { data, status } = await deleteCommentService(mock.deleteCommentParam.success as unknown as Request)

      expect(data.message).toBe("Comment deleted")
      expect(data.deletedCount).toBe(1)
      expect(status).toBe(200)
    })
  })
  // X post_id not provided
  // X comment_id not provided
  // X Invalid post_id
  // Comment non exists

  // Error on delete comment
  describe("Unhappy path", () => {
    it("Should return 'post_id not provided' message with status 400", async () => {
      const mockNoPost_id = {
        body: {
          comment_id: "mock_comment_mongoose_id",
        },
        headers: {
          _id: "mock_author_mongoose_id"
        }
      }

      const { data, status } = await deleteCommentService(mockNoPost_id as unknown as Request)

      expect(data.message).toBe("post_id not provided")
      expect(status).toBe(400)
    })

    it("Should return 'comment_id not provided' message with status 400", async () => {
      const mockNoPost_id = {
        body: {
          post_id: "mock_post_mongoose_id",
        },
        headers: {
          _id: "mock_author_mongoose_id"
        }
      }

      const { data, status } = await deleteCommentService(mockNoPost_id as unknown as Request)

      expect(data.message).toBe("comment_id not provided")
      expect(status).toBe(400)
    })
    it("Should return 'Invalid post_id' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(false) as any)

      const mockNoPost_id = {
        body: {
          post_id: "mock_post_mongoose_id",
          comment_id: "mock_comment_mongoose_id"
        },
        headers: {
          _id: "mock_author_mongoose_id"
        }
      }

      const { data, status } = await deleteCommentService(mockNoPost_id as unknown as Request)

      expect(data.message).toBe("Invalid post_id")
      expect(status).toBe(400)
    })

    it("Should return 'Invalid comment_id' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.findOne = jest.fn(() => Promise.resolve(false) as any)

      const mockNoPost_id = {
        body: {
          post_id: "mock_post_mongoose_id",
          comment_id: "mock_comment_mongoose_id"
        },
        headers: {
          _id: "mock_author_mongoose_id"
        }
      }

      const { data, status } = await deleteCommentService(mockNoPost_id as unknown as Request)

      expect(data.message).toBe("Invalid comment_id")
      expect(status).toBe(400)
    })

    it("Should return a error object with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.remove = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)


      const { data, status } = await deleteCommentService(mock.deleteCommentParam.success as unknown as Request)

      console.log(data, status)

      expect(data.message)

      expect(status).toBe(400)
    })
  })
})