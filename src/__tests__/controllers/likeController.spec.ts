import { Request } from "express"

import { handleLikeController, getLikesController } from "../../controllers/likeController"
const { handleLikeService } = require("../../useCases/like/handleLikeService")
const { getLikesService } = require("../../useCases/like/getLikesService")

import mock from "../mock/like.json"

jest.mock("../../useCases/like/handleLikeService")
jest.mock("../../useCases/like/getLikesService")

describe("Like controller", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    beforeAll(() => {
      handleLikeService.mockImplementation(() => {
        return Promise.resolve(mock.successReponse)
      })
      getLikesService.mockImplementation(() => {
        return Promise.resolve(mock.successGetLikesResponse)
      })
    })

    it("Create like service: Should return a success object and status 200", async () => {
      const { data, status } = await handleLikeController(mock as unknown as Request)

      expect(data.like).toMatchObject(mock.likeFullData)

      expect(status).toBe(200)
    })

    it("Get likes service: Should return a success object and status 200", async () => {
      const { data, status } = await getLikesController(mock as unknown as Request)

      expect(data.likesCount).toBe(mock.successGetLikesResponse.data.likesCount)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    beforeAll(() => {
      handleLikeService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
      getLikesService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
    })

    it("Create like service: Should return a success object and status 200", async () => {
      const { data, status } = await handleLikeController(mock as unknown as Request)

      expect(data.message)

      expect(status).toBe(400)
    })

    it("Get likes service: Should return a success object and status 200", async () => {
      const { data, status } = await getLikesController(mock as unknown as Request)

      expect(data.message).toBe(mock.errorResponse.data.message)

      expect(status).toBe(400)
    })
  })
})