import { Request } from "express"

import { createCommentController, getCommentsController } from "../../controllers/commentController"
const { createCommentService } = require("../../services/comment/createCommentService")
const { getCommentsService } = require("../../services/comment/getCommentsService")

import mock from "../mock/comment.json"

jest.mock("../../services/comment/createCommentService")
jest.mock("../../services/comment/getCommentsService")

describe("User controller", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    beforeAll(() => {
      createCommentService.mockImplementation(() => {
        return Promise.resolve(mock.successCreateCommentResponse)
      })
      getCommentsService.mockImplementation(() => {
        return Promise.resolve(mock.successgetCommentsResponse10)
      })
    })

    it("Create comment service: Should return a success object and status 200", async () => {
      const { data, status } = await createCommentController(mock as unknown as Request)

      expect(data).toMatchObject(mock.successCreateCommentResponse.data)

      expect(status).toBe(200)
    })

    it("Get comments service: Should return a success object and status 200", async () => {
      const { data, status } = await getCommentsController(mock as unknown as Request)

      expect(data.comments).toMatchObject(mock.successgetCommentsResponse10.data.comments)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    beforeAll(() => {
      createCommentService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
      getCommentsService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
    })

    it("Create post service: Should return a error object and status 400", async () => {
      const { data, status } = await createCommentController(mock as unknown as Request)

      expect(data.message)

      expect(status).toBe(400)
    })

    it("Get comments service: Should return a success object and status 200", async () => {
      const { data, status } = await getCommentsController(mock as unknown as Request)

      expect(data.message)

      expect(status).toBe(400)
    })
  })
})