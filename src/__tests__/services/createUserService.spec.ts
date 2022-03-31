import { createUserService } from "../../services/user/createUserService"
import { User } from "../../models/user"

import mock from "../mock/user.json"

describe("Create user service", () => {
  describe("Happy path", () => {
    User.create = jest.fn(() => Promise.resolve({ ...mock.createUserParam.body, ...mock.userCreateResult }) as any)
    User.findOne = jest.fn(() => Promise.resolve(null) as any)

    it("Should return status:200, user object and token", async () => {
      const { data, status } = await createUserService(mock.createUserParam as any)

      expect(User.findOne).toHaveBeenCalled()
      expect(User.create).toHaveBeenCalled()

      expect(data.user).toMatchObject(mock.successResponseRef.user)

      expect(typeof data.token).toBe("string")
      expect(data.token.length).toBeGreaterThan(1)

      expect(status).toBe(200)
    })
  })
})