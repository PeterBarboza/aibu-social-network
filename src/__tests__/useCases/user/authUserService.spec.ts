import { Request } from "express"

import { authUserService } from "../../../useCases/user/authUserService"
import { User } from "../../../models/user"
import bcrypt from "bcryptjs"

import mock from "../../mock/user.json"

describe("Auth user service", () => {
  describe("Happy path", () => {
    it("Should return a user and token object with status 200", async () => {
      User.findOne = jest.fn(() => {
        return {
          select: () => mock.userFullData
        }
      }) as any
      bcrypt.compare = () => true as any

      const { data, status } = await authUserService(mock.authUserParam as Request)

      const spyFindOne = jest.spyOn(User, "findOne")

      expect(data.user).toMatchObject(mock.successResponse.data.user)
      expect(data.token.length).toBeGreaterThan(1)

      expect(spyFindOne).toBeCalledTimes(1)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    it("Should return a 'User not found' message with status 400", async () => {
      User.findOne = jest.fn(() => {
        return {
          select: () => false
        }
      }) as any
      bcrypt.compare = () => false as any

      const { data, status } = await authUserService(mock.authUserParam as Request)

      const spyFindOne = jest.spyOn(User, "findOne")

      expect(data.message).toBe("User not found")

      expect(spyFindOne).toBeCalledTimes(1)

      expect(status).toBe(400)
    })

    it("Should return a error object with status 400", async () => {
      User.findOne = jest.fn(() => {
        return {
          select: () => Promise.reject(mock.errorResponse.data)
        }
      }) as any

      const { data, status } = await authUserService(mock.authUserParam as Request)

      const spyFindOne = jest.spyOn(User, "findOne")

      expect(spyFindOne).toHaveBeenCalledTimes(1)

      expect(data)

      expect(status).toBe(400)
    })

    it("Should return a 'Invalid password' message with status 400", async () => {
      User.findOne = jest.fn(() => {
        return {
          select: () => mock.userFullData
        }
      }) as any
      bcrypt.compare = () => false as any

      const { data, status } = await authUserService(mock.authUserParam as Request)

      const spyFindOne = jest.spyOn(User, "findOne")

      expect(data.message).toBe("Invalid password")

      expect(spyFindOne).toBeCalledTimes(1)

      expect(status).toBe(400)
    })

    it("Should return a 'Error generating token' message with status 400", async () => {
      User.findOne = jest.fn(() => {
        const userWithIdNull = { ...mock.userFullData, _id: null }

        return {
          select: () => userWithIdNull
        }
      }) as any
      bcrypt.compare = () => true as any

      const { data, status } = await authUserService(mock.authUserParam as Request)

      const spyFindOne = jest.spyOn(User, "findOne")

      expect(data.message).toBe("Error generating token")

      expect(spyFindOne).toBeCalledTimes(1)

      expect(status).toBe(400)
    })
  })
})