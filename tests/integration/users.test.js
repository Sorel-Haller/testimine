const request = require("supertest");
const app = require("../../src/app");
const { resetDb } = require("../helpers/resetDb");

describe("POST /users", () => {
  beforeEach(async () => {
    await resetDb();
  });

  // TODO: Ülesanne — Loob uue kasutaja
  test("loob uue kasutaja", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Ada", email: "ada@test.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Ada");
    expect(res.body.email).toBe("ada@test.com");
  });

  test("tagastab 400 kui nimi puudub", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "ada@test.com" });

    expect(res.statusCode).toBe(400);
  });

  // TODO: Ülesanne — Puuduv email tagastab 400
  test("tagastab 400 kui email puudub", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Ada" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Name and email are required",
      })
    );
  });

  // TODO: Ülesanne — Duplikaat-email tagastab 400
  test.todo("tagastab 400 kui email on juba kasutusel");
});
