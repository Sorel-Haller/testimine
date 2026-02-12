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
      .send({ name: "Test", email: "" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Test");
    expect(res.body).toHaveProperty("email", "test@test.ee");
  });

  // TODO: Ülesanne — Puuduv nimi tagastab 400
  test("tagastab 400 kui nimi puudub", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: null, email: "test@test.com" });

    expect(res.statusCode).toBe(400);
  });

  // TODO: Ülesanne — Puuduv email tagastab 400
  test("tagastab 400 kui email puudub", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Test", email: null });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Name and email are required",
      })
    );
  });

  // TODO: Ülesanne — Duplikaat-email tagastab 400
  test("tagastab 400 kui email on juba kasutusel", async () => {
    await request(app)
      .post("/users")
      .send({ name: "Test", email: "test@test.ee" });

    const res = await request(app)
      .post("/users")
      .send({ name: "Test2", email: "test@test.ee" });

    expect(res.statusCode).toBe(400);
    expect(res.body).tohHaveProperty("Error");
  });
});
