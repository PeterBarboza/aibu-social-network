import { Request } from "express"

import { createUserService } from "../../services/user/createUserService"
import { User } from "../../models/user"

import mock from "../mock/user.json"

describe("Create user service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Happy path", () => {
    it("Should return a user and token object with status 200", async () => {
      User.create = jest.fn(() => Promise.resolve(mock.userFullData) as any)
      User.findOne = jest.fn(() => Promise.resolve(null) as any)

      const { data, status } = await createUserService(mock.createUserParam as Request)

      const spyCreate = jest.spyOn(User, "create")
      const spyFindOne = jest.spyOn(User, "findOne")

      expect(spyFindOne).toHaveBeenCalledTimes(1)
      expect(spyCreate).toHaveBeenCalledTimes(1)

      expect(data.user).toMatchObject(mock.userFullData)

      expect(typeof data.token).toBe("string")
      expect(data.token.length).toBeGreaterThan(1)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    it("Should return a error object with status 400", async () => {
      User.create = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)
      User.findOne = jest.fn(() => Promise.resolve(null) as any)

      const { data, status } = await createUserService(mock.createUserParam as Request)

      const spyCreate = jest.spyOn(User, "create")
      const spyFindOne = jest.spyOn(User, "findOne")

      expect(spyCreate).rejects.toBe(mock.errorResponse.data)
      expect(spyFindOne).toHaveBeenCalledTimes(1)

      expect(data)

      expect(status).toBe(400)
    })

    it("Should return a 'User already exists' message with status 400", async () => {
      User.create = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)
      User.findOne = jest.fn(() => Promise.resolve(mock.userFullData) as any)

      const { data, status } = await createUserService(mock.createUserParam as Request)

      const spyCreate = jest.spyOn(User, "create")
      const spyFindOne = jest.spyOn(User, "findOne")

      expect(spyFindOne).toHaveBeenCalledTimes(1)
      expect(spyCreate).rejects.toBe(mock.errorResponse.data)

      expect(data.message).toBe("User already exists")

      expect(status).toBe(400)
    })

    it("Should return a 'Error generating token' message with status 400", async () => {
      const userWithIdNull = { ...mock.userFullData, _id: null }

      User.create = jest.fn(() => Promise.resolve(userWithIdNull) as any)
      User.findOne = jest.fn(() => Promise.resolve(null) as any)

      const { data, status } = await createUserService(mock.createUserParam as Request)

      const spyFindOne = jest.spyOn(User, "findOne")

      expect(data.message).toBe("Error generating token")

      expect(spyFindOne).toBeCalledTimes(1)

      expect(status).toBe(400)
    })
  })
})
