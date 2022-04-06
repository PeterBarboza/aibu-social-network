import { Request } from "express"

import { getPostsService } from "../../../services/post/getPostsService"
import { Post } from "../../../models/post"

import mock from "../../mock/post.json"

describe("Get posts service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Happy path", () => {
    it("Should return a posts array and a next route with status 200", async () => {
      Post.find = jest.fn(() => {
        function limit() {
          return mock.successgetPostsResponse10.data.posts
        }
        return {
          gt: () => { return { limit: limit } }
        }
      }) as any

      const { data, status } = await getPostsService(mock.getPostsParam as unknown as Request)

      expect(data.posts).toMatchObject(mock.successgetPostsResponse10.data.posts)
      expect(data.next).toBe(mock.successgetPostsResponse10.data.next)

      expect(status).toBe(200)
    })

    it("Should return a posts array and next 'finish' with status 200", async () => {
      Post.find = jest.fn(() => {
        function limit() {
          return mock.successgetPostsResponse5.data.posts
        }
        return {
          gt: () => { return { limit: limit } }
        }
      }) as any

      const { data, status } = await getPostsService(mock.getPostsParam as unknown as Request)

      expect(data.posts).toMatchObject(mock.successgetPostsResponse5.data.posts)
      expect(data.next).toBe(mock.successgetPostsResponse5.data.next)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    it("Should return a 'unixData query param is ausent' message with status 400", async () => {
      const reqParamNullQuery = {
        query: {
          unixDate: null
        }
      }

      const { data, status } = await getPostsService(reqParamNullQuery as unknown as Request)

      expect(data.message).toBe("unixData query param is ausent")

      expect(status).toBe(400)
    })

    it("Should return a 'unixData format invalid. It must be 13 characters long' message with status 400", async () => {
      const reqParamShortQuery = {
        query: {
          unixDate: "16492611367"
        }
      }

      const { data, status } = await getPostsService(reqParamShortQuery as unknown as Request)

      expect(data.message).toBe("unixData format invalid. It must be 13 characters long")

      expect(status).toBe(400)
    })

    it("Should return a 'unixData format invalid. It must contain numbers only' message with status 400", async () => {
      const reqParamShortQuery = {
        query: {
          unixDate: "abc9261136@-2"
        }
      }

      const { data, status } = await getPostsService(reqParamShortQuery as unknown as Request)

      expect(data.message).toBe("unixData format invalid. It must contain numbers only")

      expect(status).toBe(400)
    })

    it("Should return a error object with status 400", async () => {
      Post.find = jest.fn(() => {
        function limit() {
          return Promise.reject(mock.errorResponse.data)
        }
        return {
          gt: () => { return { limit: limit } }
        }
      }) as any

      const { data, status } = await getPostsService(mock.getPostsParam as unknown as Request)

      expect(data)

      expect(status).toBe(400)
    })
  })
})