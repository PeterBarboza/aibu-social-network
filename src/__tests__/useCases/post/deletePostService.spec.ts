
import { Request } from "express"

import { deletePostService } from "../../../useCases/post/deletePostService"
import { Post } from "../../../models/post"

import mock from "../../mock/post.json"

describe("Delete post service", () => {
  mock.deletePostParams.fail
  describe("Happy path", () => {
    it("Should return 'post deleted' and deletedCount equal to 1 with status 200", async () => {
      Post.findOne = jest.fn(() => Promise.resolve({ author_id: mock.deletePostParams.success.headers._id }) as any)
      Post.deleteOne = jest.fn(() => Promise.resolve({ deletedCount: 1 }) as any)

      const { data, status } = await deletePostService(mock.deletePostParams.success as unknown as Request)

      expect(status).toBe(200)
      expect(data.message).toBe("post deleted")
      expect(data.deletedCount).toBe(1)
    })
  })

  describe("Unhappy path", () => {
    it("Should return 'post_id not provided' message with status 400", async () => {
      const { data, status } = await deletePostService(mock.deletePostParams.fail as unknown as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("post_id not provided")
    })

    it("Should return 'Post non exists' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await deletePostService(mock.deletePostParams.success as unknown as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("Post non exists")
    })

    it("Should return 'unauthorized delete' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve({ author_id: "another_author_id" }) as any)

      const { data, status } = await deletePostService(mock.deletePostParams.success as unknown as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("unauthorized delete")
    })

    it("Should return a error object with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve({ author_id: mock.deletePostParams.success.headers._id }) as any)
      Post.deleteOne = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)

      const { data, status } = await deletePostService(mock.deletePostParams.success as unknown as Request)

      expect(status).toBe(400)
      expect(data.message)
    })
  })
})