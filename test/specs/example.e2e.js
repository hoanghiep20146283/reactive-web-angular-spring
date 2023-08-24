describe("User List App", () => {
  it("Should have a header", async () => {
    await browser.get("/users");
    const input = element(by.css("input"));
    await input.sendKeys("davis");
    const headerElement = element(by.css("h2"));
    headerElement.getText().then((text) => {
      console.log(`header founded: ${text}`);
      expect(text).toBe("Filtered Users");
    });
  });

  it("Should have 16 users on page load", async () => {
    const items = by.css("li");
    const users = element.all(items);
    expect(await users.count()).toBe(2);
  });

  it("Should highlight filter text", async () => {
    const items = element.all(by.css("li"));
    (await items).forEach((item) => {
      const span = item.element(by.css("span"));
      expect(span.getAttribute("class")).toBe("highlight-text");
    });
  });
});
