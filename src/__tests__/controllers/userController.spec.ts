import { Request } from "express"

import { createUserController } from "../../controllers/userController"
const { createUserService } = require("../../services/user/createUserService")

import mock from "../mock/user.json"

jest.mock("../../services/user/createUserService")

//TODO: testar authUserController
describe("Create user controller", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    beforeAll(() => {
      createUserService.mockImplementation(() => {
        return Promise.resolve(mock.successResponse)
      })
    })
    it("Should return a success object and status 200", async () => {
      const { data, status } = await createUserController(mock.createUserParam as Request)

      expect(data.user).toMatchObject(mock.successResponse.data.user)

      expect(typeof data.token).toBe("string")
      expect(data.token.length).toBeGreaterThan(1)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    beforeAll(() => {
      createUserService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
    })
    it("Should return a error object and status 400", async () => {
      const { data, status } = await createUserController(mock.createUserParam as Request)

      expect(data)
      expect(status).toBe(400)
    })
  })
})