import { Request } from "express"

import { getPostsService } from "../../../services/post/getPostsService"
import { Post } from "../../../models/post"

import mock from "../../mock/post.json"

describe("Get posts service", () => {
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
      empty } = mock.getPostsParams.success


    it("unixDate and limit on param: Should return a array with 5 posts and next url with status 200", async () => {
      Post.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: (param: any) => mock.postsArray5
                }
              }
            }
          }
        }
      }) as any

      const { data, status } = await getPostsService(withUnixDateAndLimit as unknown as Request)

      const expectedNextUrl = `${apiUrl}/post/getFeed?unixDate=${mock.postsArray5[4].createdAt}&limit=${withUnixDateAndLimit.query.limit}`

      expect(data.posts).toMatchObject(mock.postsArray5)
      expect(data.posts.length).toBe(5)
      expect(data.next).toBe(expectedNextUrl)
      expect(status).toBe(200)
    })

    it("unixDate and limit on param: Should return a array with 4 posts and next filled with 'finish' and status 200", async () => {
      const mockPostsArray4 = mock.postsArray5.map((item) => item)
      mockPostsArray4.pop()

      Post.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: (param: any) => mockPostsArray4
                }
              }
            }
          }
        }
      }) as any


      const { data, status } = await getPostsService(withUnixDateAndLimit as unknown as Request)

      const expectedNextUrl = "finish"

      expect(data.posts).toMatchObject(mockPostsArray4 as any)
      expect(data.posts.length).toBe(4)
      expect(data.next).toBe(expectedNextUrl)
      expect(status).toBe(200)
    })

    it("unixDate and wrong limit on param: Should return a array with 10 posts and next url with status 200", async () => {
      Post.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: (param: any) => mock.postsArray10
                }
              }
            }
          }
        }
      }) as any

      const { data, status } = await getPostsService(withUnixDateAndWrongLimit as unknown as Request)

      const expectedNextUrl = `${apiUrl}/post/getFeed?unixDate=${mock.postsArray10[9].createdAt}&limit=${10}`

      expect(data.posts).toMatchObject(mock.postsArray10)
      expect(data.posts.length).toBe(10)
      expect(data.next).toBe(expectedNextUrl)
      expect(status).toBe(200)
    })

    it("Only unixDate on param: Should return a array with 10 posts and next url with status 200", async () => {
      Post.find = jest.fn(() => {
        return {
          lt: (param: any) => {
            return {
              sort: (param: any) => {
                return {
                  limit: (param: any) => mock.postsArray10
                }
              }
            }
          }
        }
      }) as any

      const { data, status } = await getPostsService(withUnixDate as unknown as Request)

      const expectedNextUrl = `${apiUrl}/post/getFeed?unixDate=${mock.postsArray10[9].createdAt}&limit=${10}`

      expect(data.posts).toMatchObject(mock.postsArray10)
      expect(data.posts.length).toBe(10)
      expect(data.next).toBe(expectedNextUrl)
      expect(status).toBe(200)
    })

    it("Only limit on param: Should return a array with 10 posts and next url with status 200", async () => {
      Post.find = jest.fn(() => {
        return {
          sort: (param: any) => {
            return {
              limit: (param: any) => mock.postsArray5
            }
          }
        }
      }
      ) as any

      const { data, status } = await getPostsService(withLimit as unknown as Request)

      const expectedNextUrl = `${apiUrl}/post/getFeed?unixDate=${mock.postsArray5[4].createdAt}&limit=${withLimit.query.limit}`

      expect(data.posts).toMatchObject(mock.postsArray5)
      expect(data.posts.length).toBe(5)
      expect(data.next).toBe(expectedNextUrl)
      expect(status).toBe(200)
    })

    it("Empty param: Should return a array with 5 posts and next filled with 'finish' with status 200", async () => {
      Post.find = jest.fn(() => {
        return {
          sort: (param: any) => {
            return {
              limit: (param: any) => mock.postsArray5
            }
          }
        }
      }
      ) as any

      const { data, status } = await getPostsService(empty as unknown as Request)

      const expectedNextUrl = "finish"

      expect(data.posts).toMatchObject(mock.postsArray5)
      expect(data.posts.length).toBe(5)
      expect(data.next).toBe(expectedNextUrl)
      expect(status).toBe(200)
    })
  })

  describe("Unhappy path", () => {
    const {
      wrongUnixDateLengthAndLimit,
      wrongUnixDateTypeAndLimit } = mock.getPostsParams.fail

    it("Wrong unixDate length and limit: Should return 'unixData format invalid. It must be 13 characters long' message with status 400", async () => {
      const { data, status } = await getPostsService(wrongUnixDateLengthAndLimit as unknown as Request)

      expect(data.message).toBe("unixData format invalid. It must be 13 characters long")
      expect(status).toBe(400)
    })

    it("Wrong unixDate type and limit: Should return 'unixData format invalid. It must contain numbers only' message with status 400", async () => {
      const { data, status } = await getPostsService(wrongUnixDateTypeAndLimit as unknown as Request)

      expect(data.message).toBe("unixData format invalid. It must contain numbers only")
      expect(status).toBe(400)
    })

    it("Any param: Should return a error object with status 400", async () => {
      Post.find = jest.fn(() => {
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

      const { data, status } = await getPostsService(mock.getPostsParams.success.withUnixDateAndLimit as unknown as Request)

      expect(data.message)
      expect(status).toBe(400)
    })
  })
})