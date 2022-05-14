import { Request } from "express"

import { getCommentsService } from "../../../useCases/comment/getCommentsService"
import { Comment } from "../../../models/comment"
import { Post } from "../../../models/post"

import mock from "../../mock/comment.json"

//TODO: Terminar testes do getCommentsService
describe("Get comments service", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const apiUrl = process.env.API_URL

  describe("Happy path", () => {
    const {
      withUnixDateAndLimit,
      withUnixDateAndWrongLimit,
      withUnixDate,
      withLimit,
      empty } = mock.getCommentsParams.success

    it("unixDate and limit on param: Should return a array with 5 comments and next url with status 200", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.countDocuments = jest.fn(() => Promise.resolve(mock.commentsArray5.length) as any)
      Comment.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: () => Promise.resolve(mock.commentsArray5)
                }
              }
            }
          }
        }
      }) as any

      const { data, status } = await getCommentsService(withUnixDateAndLimit as unknown as Request)

      const expectedNextUrl = `${apiUrl}/comment/getComments?unixDate=${mock.commentsArray5[4].createdAt}&limit=${withUnixDateAndLimit.query.limit}`

      expect(data.comments).toMatchObject(mock.commentsArray5)
      expect(data.comments.length).toBe(5)
      expect(data.next).toBe(expectedNextUrl)
      expect(data.commentsCount).toBe(5)

      expect(status).toBe(200)
    })

    it("unixDate and limit on param: Should return a array with 4 comments and next filled with 'finish' and status 200", async () => {
      const mockCommentsArray4 = mock.commentsArray5.map((item) => item)
      mockCommentsArray4.pop()

      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.countDocuments = jest.fn(() => Promise.resolve(mockCommentsArray4.length) as any)
      Comment.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: () => Promise.resolve(mockCommentsArray4)
                }
              }
            }
          }
        }
      }) as any

      const { data, status } = await getCommentsService(withUnixDateAndLimit as unknown as Request)

      const expectedNextUrl = "finish"

      expect(data.comments).toMatchObject(mockCommentsArray4)
      expect(data.comments.length).toBe(4)
      expect(data.next).toBe(expectedNextUrl)
      expect(data.commentsCount).toBe(4)

      expect(status).toBe(200)
    })

    it("unixDate and wrong limit on param: Should return a array with 10 comments and next url with status 200", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.countDocuments = jest.fn(() => Promise.resolve(mock.commentsArray10.length) as any)
      Comment.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: () => Promise.resolve(mock.commentsArray10)
                }
              }
            }
          }
        }
      }) as any

      const { data, status } = await getCommentsService(withUnixDateAndWrongLimit as unknown as Request)

      const expectedNextUrl = `${apiUrl}/comment/getComments?unixDate=${mock.commentsArray10[9].createdAt}&limit=${10}`

      expect(data.comments).toMatchObject(mock.commentsArray10)
      expect(data.comments.length).toBe(10)
      expect(data.next).toBe(expectedNextUrl)
      expect(data.commentsCount).toBe(10)

      expect(status).toBe(200)
    })

    it("Only unixDate on param: Should return a array with 10 comments and next url with status 200", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.countDocuments = jest.fn(() => Promise.resolve(mock.commentsArray10.length) as any)
      Comment.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: () => Promise.resolve(mock.commentsArray10)
                }
              }
            }
          }
        }
      }) as any

      const { data, status } = await getCommentsService(withUnixDate as unknown as Request)

      const expectedNextUrl = `${apiUrl}/comment/getComments?unixDate=${mock.commentsArray10[9].createdAt}&limit=${10}`

      expect(data.comments).toMatchObject(mock.commentsArray10)
      expect(data.comments.length).toBe(10)
      expect(data.next).toBe(expectedNextUrl)
      expect(data.commentsCount).toBe(10)

      expect(status).toBe(200)
    })

    it("Only limit on param: Should return a array with 5 comments and next url with status 200", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.countDocuments = jest.fn(() => Promise.resolve(mock.commentsArray5.length) as any)
      Comment.find = jest.fn(() => {
        return {
          sort: (param: any) => {
            return {
              limit: () => Promise.resolve(mock.commentsArray5)
            }
          }
        }
      }) as any

      const { data, status } = await getCommentsService(withLimit as unknown as Request)

      const expectedNextUrl = `${apiUrl}/comment/getComments?unixDate=${mock.commentsArray5[4].createdAt}&limit=${withLimit.query.limit}`

      expect(data.comments).toMatchObject(mock.commentsArray5)
      expect(data.comments.length).toBe(5)
      expect(data.next).toBe(expectedNextUrl)
      expect(data.commentsCount).toBe(5)

      expect(status).toBe(200)
    })

    it("Empty param: Should return a array with 5 posts and next filled with 'finish' with status 200", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.countDocuments = jest.fn(() => Promise.resolve(mock.commentsArray5.length) as any)
      Comment.find = jest.fn(() => {
        return {
          sort: (param: any) => {
            return {
              limit: () => Promise.resolve(mock.commentsArray5)
            }
          }
        }
      }) as any

      const { data, status } = await getCommentsService(empty as unknown as Request)

      const expectedNextUrl = "finish"

      expect(data.comments).toMatchObject(mock.commentsArray5)
      expect(data.comments.length).toBe(5)
      expect(data.next).toBe(expectedNextUrl)
      expect(data.commentsCount).toBe(5)

      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    const {
      wrongUnixDateLengthAndLimit,
      wrongUnixDateTypeAndLimit,
      noPost_idProvided } = mock.getCommentsParams.fail

    it("No post_id provided: Should return 'post_id not provided' message with status 400", async () => {
      const { data, status } = await getCommentsService(noPost_idProvided as unknown as Request)

      expect(data.message).toBe("post_id not provided")
      expect(status).toBe(400)
    })

    it("Wrong unixDate length and limit: Should return 'unixData format invalid. It must be 13 characters long' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)

      const { data, status } = await getCommentsService(wrongUnixDateLengthAndLimit as unknown as Request)

      expect(data.message).toBe("unixData format invalid. It must be 13 characters long")
      expect(status).toBe(400)
    })

    it("Wrong unixDate type and limit: Should return 'unixData format invalid. It must contain numbers only' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)

      const { data, status } = await getCommentsService(wrongUnixDateTypeAndLimit as unknown as Request)

      expect(data.message).toBe("unixData format invalid. It must contain numbers only")
      expect(status).toBe(400)
    })

    it("Invalid post_id: Should a 'Invalid post_id' message with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(false) as any)

      const { data, status } = await getCommentsService(mock.getCommentsParams.success.withUnixDateAndLimit as unknown as Request)

      expect(data.message).toBe("Invalid post_id")
      expect(status).toBe(400)
    })

    it("Any param: Should return a error object with status 400", async () => {
      Post.findOne = jest.fn(() => Promise.resolve(true) as any)
      Comment.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: (param: any) => Promise.reject(mock.errorResponse.data)
                }
              }
            }
          }
        }
      }) as any

      const { data, status } = await getCommentsService(mock.getCommentsParams.success.withUnixDateAndLimit as unknown as Request)

      expect(data.message)
      expect(status).toBe(400)
    })
  })
})