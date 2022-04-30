import { Request } from "express"

import { updatePostService } from "../../../services/post/updatePostService"
import { Post } from "../../../models/post"

import mock from "../../mock/post.json"

describe("", () => {
  describe("Happy path", () => {
    it("Should return modifiedCount === 1 and 'post updated' message with status 200", async () => {
      const author_id = mock.updatePostParams.success.headers._id

      Post.findOne = jest.fn(() => Promise.resolve({ author_id: author_id }) as any)
      Post.updateOne = jest.fn(() => Promise.resolve({ modifiedCount: 1 }) as any)

      const { data, status } = await updatePostService(mock.updatePostParams.success as unknown as Request)

      expect(status).toBe(200)
      expect(data.modifiedCount).toBe(1)
      expect(data.message).toBe("post updated")
    })
  })

  describe("Unhappy path", () => {
    const { noPost_id, noContent, wrongAuthor_id } = mock.updatePostParams.fail

    it("Should return a 'post_id not provided' message with status 400", async () => {
      const { data, status } = await updatePostService(noPost_id as unknown as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("post_id not provided")
    })

    it("Should return a 'content not provided' message with status 400", async () => {
      const { data, status } = await updatePostService(noContent as unknown as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("content not provided")
    })

    it("Should return a 'Post non exists' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await updatePostService(mock.updatePostParams.success as unknown as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("Post non exists")
    })

    it("Should return a 'unauthorized update' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve({ author_id: "any_author_id" }) as any)

      const { data, status } = await updatePostService(wrongAuthor_id as unknown as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("unauthorized update")
    })

    it("Should return a 'Error on update post' message with status 400", async () => {
      const author_id = mock.updatePostParams.success.headers._id

      Post.findOne = jest.fn(() => Promise.resolve({ author_id: author_id }) as any)
      Post.updateOne = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)

      const { data, status } = await updatePostService(mock.updatePostParams.success as unknown as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("Error on update post")
    })
  })
})