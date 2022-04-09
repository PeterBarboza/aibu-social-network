import { Request } from "express"

import { createLikeService } from "../../../../services/postData/like/createLikeService"
import { Post } from "../../../../models/post"
import { User } from "../../../../models/user"
import { Like } from "../../../../models/like"

import mock from "../../../mock/like.json"

describe("Create like service", () => {
  beforeAll(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    it("Should return a like object with status 200", async () => {
      User.findOne = jest.fn(() => Promise.resolve(true) as any)
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.create = jest.fn(() => Promise.resolve(mock.likeFullData) as any)

      const { data, status } = await createLikeService(mock.createLikeParams.success as unknown as Request)

      expect(data.like).toBe(mock.likeFullData)
      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    it("Should return a 'Invalid user_id' message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await createLikeService(mock.createLikeParams.success as unknown as Request)

      expect(data.message).toBe("Invalid user_id")
      expect(status).toBe(400)
    })

    it("Should return a 'Invalid post_id' message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(true) as any)
      Post.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await createLikeService(mock.createLikeParams.success as unknown as Request)

      expect(data.message).toBe("Invalid post_id")
      expect(status).toBe(400)
    })

    it("Should return a 'Like already exists' message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(true) as any)
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await createLikeService(mock.createLikeParams.success as unknown as Request)

      expect(data.message).toBe("Like already exists")
      expect(status).toBe(400)
    })

    it("Should return a 'Error on create like' message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(true) as any)
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.create = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await createLikeService(mock.createLikeParams.success as unknown as Request)

      expect(data.message).toBe("Error on create like")
      expect(status).toBe(400)
    })

    it("Should return a error object with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(true) as any)
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.create = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)

      const { data, status } = await createLikeService(mock.createLikeParams.success as unknown as Request)

      expect(data.message)
      expect(status).toBe(400)
    })
  })
})