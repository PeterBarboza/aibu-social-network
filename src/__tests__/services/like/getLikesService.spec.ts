import { Request } from "express"

import { getLikesService } from "../../../services/like/getLikesService"
import { Post } from "../../../models/post"
import { Like } from "../../../models/like"

import mock from "../../mock/like.json"

describe("Get likes service", () => {
  beforeAll(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    it("Should return the count of like objects of a post with status 200", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.countDocuments = jest.fn(() => Promise.resolve(15) as any)

      const postIdMock = {
        body: {
          post_id: "mock_post_mongoose_id"
        }
      }

      const { data, status } = await getLikesService(postIdMock as Request)

      expect(typeof data.likesCount).toBe("number")
      expect(data.likesCount >= 0).toBe(true)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    it("Should return a 'invalid post_id' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(false) as any)

      const postIdMock = {
        body: {
          post_id: "mock_post_mongoose_id"
        }
      }

      const { data, status } = await getLikesService(postIdMock as Request)

      expect(data.message).toBe("invalid post_id")

      expect(status).toBe(400)
    })
    it("Should return a error object with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Like.countDocuments = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)

      const postIdMock = {
        body: {
          post_id: "mock_post_mongoose_id"
        }
      }

      const { data, status } = await getLikesService(postIdMock as Request)

      expect(data.message)

      expect(status).toBe(400)
    })


  })
})