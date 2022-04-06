import { verifyToken } from "../../utils/verifyToken";
import { generateToken } from "../../utils/generateToken";

describe("Verify token function", () => {
  describe("Happy path", () => {
    it("Should return the user _id", async () => {
      const mockUserId = "65e84da4fd8d1a6541d2"
      const token = generateToken(mockUserId)

      const { _id } = verifyToken(token as string)

      console.log(_id)
      expect(typeof _id).toBe("string")
      expect(_id).toBe(mockUserId)
    })
  })

  describe("Unhappy path", () => {
    it("Should return null", async () => {
      const invalidToken = "token.123"

      const { _id } = verifyToken(invalidToken as string)

      console.log(_id)
      expect(_id).toBe(null)
    })
  })
})