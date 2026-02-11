const request = require("supertest");
const app = require("../../src/app");
const { resetDb } = require("../helpers/resetDb");

describe("POST /workshops", () => {
  beforeEach(async () => {
    await resetDb();
  });

  // TODO: Ülesanne — Workshop loomine õnnestub
  test("loob uue workshop'i", async () => {
    const response = await request(app)
      .post("/workshops")
      .send({
        title: "test workshop",
        capacity: 20
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: "test workshop",
        capacity: 20
      })
    );
  });

  // TODO: Ülesanne — Puuduv title tagastab 400
  test("tagastab 400 kui title puudub", async () => {
    const response = await request(app)
      .post("/workshops")
      .send({
        title: "",
        capacity: 20
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Title and capacity are required"
      })
    );
  });
});
