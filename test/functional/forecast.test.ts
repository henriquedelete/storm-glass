describe("BEach forecast functional tests", () => {
  it("Should return a forecast with just a few times", async () => {
    const { body, status } = await global.testRequest.get("/forecast");
    console.log({ body, status });
    expect(status).toBe(200);
  });
});
