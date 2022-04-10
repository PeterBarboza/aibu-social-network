import { Request } from "express"

import { createCommentController } from "../../controllers/commentController"
const { createCommentService } = require("../../services/comment/createCommentService")

import mock from "../mock/comment.json"

jest.mock("../../services/comment/createCommentService")

describe("User controller", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    beforeAll(() => {
      createCommentService.mockImplementation(() => {
        return Promise.resolve(mock.successCreateCommentResponse)
      })
    })

    it("Create comment service: Should return a success object and status 200", async () => {
      const { data, status } = await createCommentController(mock.createCommentParam.success as unknown as Request)

      expect(data).toMatchObject(mock.successCreateCommentResponse.data)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    beforeAll(() => {
      createCommentService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
    })

    it("Create post service: Should return a error object and status 400", async () => {
      const { data, status } = await createCommentController(mock as unknown as Request)

      expect(data.message)

      expect(status).toBe(400)
    })
  })
})