import { generateToken } from "../../utils/generateToken"

describe("Generate token function", () => {
  describe("Happy path", () => {
    it("Should return a string", () => {
      const mockId = "abc123#.testNode"

      const token = generateToken(mockId)

      expect(token).toMatch("")
    })
  })

  describe("Unhappy path", () => {
    it("Should return null", () => {
      const mockId = { foo: "bar" }

      const wrongTypeResult = generateToken(mockId as any)
      const noParamResult = generateToken(undefined as any)

      expect(wrongTypeResult).toBe(null)
      expect(noParamResult).toBe(null)
    })
  })
})