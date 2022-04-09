import { Request } from "express"

import { createLikeController } from "../../controllers/likeController"
const { createLikeService } = require("../../services/postData/like/createLikeService")

import mock from "../mock/like.json"

jest.mock("../../services/postData/like/createLikeService")

describe("Like controller", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    beforeAll(() => {
      createLikeService.mockImplementation(() => {
        return Promise.resolve(mock.successReponse)
      })
    })

    it("Create like service: Should return a success object and status 200", async () => {
      const { data, status } = await createLikeController(mock as unknown as Request)

      expect(data.like).toMatchObject(mock.likeFullData)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    beforeAll(() => {
      createLikeService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
    })

    it("Create like service: Should return a success object and status 200", async () => {
      const { data, status } = await createLikeController(mock as unknown as Request)

      expect(data.message)

      expect(status).toBe(400)
    })
  })
})