import { Request } from "express"

import { createUserController, authUserController } from "../../controllers/userController"
const { createUserService } = require("../../services/user/createUserService")
const { authUserService } = require("../../services/user/authUserService")

import mock from "../mock/user.json"

jest.mock("../../services/user/createUserService")
jest.mock("../../services/user/authUserService")

describe("Create user controller", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("Happy path", () => {
    beforeAll(() => {
      createUserService.mockImplementation(() => {
        return Promise.resolve(mock.successResponse)
      })
      authUserService.mockImplementation(() => {
        return Promise.resolve(mock.successResponse)
      })
    })

    it("Create user service: Should return a success object and status 200", async () => {
      const { data, status } = await createUserController(mock.createUserParam as Request)

      expect(data.user).toMatchObject(mock.successResponse.data.user)

      expect(typeof data.token).toBe("string")
      expect(data.token.length).toBeGreaterThan(1)

      expect(status).toBe(200)
    })

    it("Auth user service: Should return a success object and status 200", async () => {
      const { data, status } = await authUserController(mock.authUserParam as Request)

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
      authUserService.mockImplementation(() => {
        return Promise.resolve(mock.errorResponse)
      })
    })

    it("Create user service: Should return a error object and status 400", async () => {
      const { data, status } = await createUserController(mock.createUserParam as Request)

      expect(data)
      expect(status).toBe(400)
    })

    it("Create user service: Should return a error object and status 400", async () => {
      const { data, status } = await authUserController(mock.createUserParam as Request)

      expect(data)
      expect(status).toBe(400)
    })
  })
})