import { Request } from "express"

import { createPostController, getPostsController } from "../../controllers/postController"
const { createPostService } = require("../../services/post/createPostService")
const { getPostsService } = require("../../services/post/getPostsService")

import mock from "../mock/post.json"

jest.mock("../../services/post/createPostService")
jest.mock("../../services/post/getPostsService")

describe("User controller", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    beforeAll(() => {
      createPostService.mockImplementation(() => {
        return Promise.resolve(mock.successCreatePostResponse)
      })
      getPostsService.mockImplementation(() => {
        return Promise.resolve(mock.successgetPostsResponse10)
      })
    })

    it("Create post service: Should return a success object and status 200", async () => {
      const { data, status } = await createPostController(mock as unknown as Request)

      expect(data).toMatchObject(mock.successCreatePostResponse.data)

      expect(status).toBe(200)
    })

    it("Get posts service: Should return a success object and status 200", async () => {
      const { data, status } = await getPostsController(mock as unknown as Request)

      expect(data).toMatchObject(mock.successgetPostsResponse10.data)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    beforeAll(() => {
      createPostService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
      getPostsService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
    })

    it("Create post service: Should return a error object and status 400", async () => {
      const { data, status } = await createPostController(mock as unknown as Request)

      expect(data.message)

      expect(status).toBe(400)
    })

    it("Get posts service: Should return a error object and status 400", async () => {
      const { data, status } = await getPostsController(mock as unknown as Request)

      expect(data.message)

      expect(status).toBe(400)
    })
  })
})