import { Home } from "SDK";

describe("test api home", () => {
  it("should be ok", async () => {
    const result = await Home.index("xxx");
    expect(result).toBe("xxx");
  });
});
