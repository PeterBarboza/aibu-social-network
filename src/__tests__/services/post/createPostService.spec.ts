import { Request } from "express"

import { createPostService } from "../../../services/post/createPostService"
import { Post } from "../../../models/post"
import { User } from "../../../models/user"

import mock from "../../mock/post.json"

describe("Create post service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Happy path", () => {
    it("Should return post with status 200", async () => {
      Post.create = jest.fn(() => Promise.resolve(mock.postFullData) as any)
      User.findOne = jest.fn(() => Promise.resolve(true) as any)

      const { data, status } = await createPostService(mock.createPostParam.success as unknown as Request)

      const spyCreate = jest.spyOn(Post, "create")
      const spyFindOne = jest.spyOn(User, "findOne")

      expect(spyFindOne).toHaveBeenCalledTimes(1)
      expect(spyCreate).toHaveBeenCalledTimes(1)

      expect(data.post).toMatchObject(mock.postFullData)

      expect(status).toBe(200)
    })

    describe("Unhappy path", () => {
      it("Should return a 'Invalid user_id' message with status 400", async () => {
        Post.create = jest.fn(() => Promise.resolve(mock.postFullData) as any)
        User.findOne = jest.fn(() => Promise.resolve(null) as any)

        const { data, status } = await createPostService(mock.createPostParam.success as unknown as Request)

        const spyCreate = jest.spyOn(Post, "create")
        const spyFindOne = jest.spyOn(User, "findOne")

        expect(spyFindOne).toHaveBeenCalledTimes(1)
        expect(spyCreate).toHaveBeenCalledTimes(0)

        expect(data.message).toBe("Invalid user_id")

        expect(status).toBe(400)
      })

      it("Should return a 'Content field couldn't be empty' message with status 400", async () => {
        const { data, status } = await createPostService(mock.createPostParam.fail as unknown as Request)

        expect(data.message).toBe("Content field couldn't be empty")

        expect(status).toBe(400)
      })

      it("Should return a error object with status 400", async () => {
        Post.create = jest.fn(() => Promise.reject(mock.errorResponse.data) as any)
        User.findOne = jest.fn(() => Promise.resolve(true) as any)

        const { data, status } = await createPostService(mock.createPostParam.success as unknown as Request)

        const spyCreate = jest.spyOn(Post, "create")
        const spyFindOne = jest.spyOn(User, "findOne")

        expect(spyFindOne).toHaveBeenCalledTimes(1)
        expect(spyCreate).rejects.toBe(mock.errorResponse.data)

        expect(data)
        expect(status).toBe(400)
      })
    })
  })
})