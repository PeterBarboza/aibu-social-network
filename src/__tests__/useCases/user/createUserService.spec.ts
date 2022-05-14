import { Request } from "express"

import { createUserService } from "../../../useCases/user/createUserService"
import { User } from "../../../models/user"

import mock from "../../mock/user.json"

describe("Create user service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const { name, username, password, email, bio, _id, createdAt } = mock.userFullData

  const successParams = mock.createUserParam.success

  describe("Happy path", () => {

    it("Should return a full user object and a token message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(false) as any)
      User.create = jest.fn(() => Promise.resolve(mock.userFullData) as any)

      const { data, status } = await createUserService(successParams as Request)

      expect(status).toBe(200)
      expect(data.user).toMatchObject(mock.userFullData)
      expect(data.token)
    })
  })
  describe("Unhappy path", () => {
    const { noEmail, noName, noUsername } = mock.createUserParam.fail

    it("Should return 'name not provided' message with status 400", async () => {
      const { data, status } = await createUserService(noName as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("name not provided")
    })

    it("Should return 'username not provided' message with status 400", async () => {
      const { data, status } = await createUserService(noUsername as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("username not provided")
    })

    it("Should return 'email not provided' message with status 400", async () => {
      const { data, status } = await createUserService(noEmail as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("email not provided")
    })

    it("Should return 'username already in use' message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(true) as any)

      const { data, status } = await createUserService(successParams as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("username already in use")
    })

    it("Should return 'User already exists' message with status 400", async () => {
      const userFindOne_Mock = jest.fn()
      userFindOne_Mock.mockReturnValueOnce(Promise.resolve(false)).mockReturnValueOnce(Promise.resolve(true))

      User.findOne = userFindOne_Mock

      const { data, status } = await createUserService(successParams as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("User already exists")
    })

    it("Should return 'Error generating token' message with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(false) as any)
      User.create = jest.fn(() => Promise.resolve({ ...mock.userFullData, _id: false }) as any)

      const { data, status } = await createUserService(successParams as Request)

      expect(status).toBe(400)
      expect(data.message).toBe("Error generating token")
    })

    it("Should return a error object with status 400", async () => {
      User.findOne = jest.fn(() => Promise.resolve(false) as any)
      User.create = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)

      const { data, status } = await createUserService(successParams as Request)

      expect(status).toBe(400)
      expect(data.message)
    })
  })
})