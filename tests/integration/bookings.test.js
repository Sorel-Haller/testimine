const request = require("supertest");
const app = require("../../src/app");
const { resetDb } = require("../helpers/resetDb");

describe("POST /bookings", () => {
  beforeEach(async () => {
    await resetDb();
  });

  // TODO: Ülesanne — Broneering õnnestub (happy path)
  test("loob broneeringu", async () => {
    // Loo esmalt kasutaja ja workshop
    const user = await request(app)
      .post("/users")
      .send({ name: "Test", email: "test@test.com" });

    const workshop = await request(app)
      .post("/workshops")
      .send({ title: "Testing", capacity: 10 });

    // Nüüd tee broneering
    const res = await request(app)
      .post("/bookings")
      .send({
        userId: user.body.id,
        workshopId: workshop.body.id
      });

    expect(res.statusCode).toBe(201);
  });

  // TODO: Ülesanne — Workshop on täis → 409
  test("tagastab 409 kui workshop on täis", async () => {
    const user1 = await request(app)
      .post("/users")
      .send({ name: "User1", email: "u1@test.com" });

    const user2 = await request(app)
      .post("/users")
      .send({ name: "User2", email: "u2@test.com" });

    const workshop = await request(app)
      .post("/workshops")
      .send({ title: "Testing", capacity: 1 });

    await request(app)
      .post("/bookings")
      .send({ userId: user1.body.id, workshopId: workshop.body.id });

    const res = await request(app)
      .post("/bookings")
      .send({ userId: user2.body.id, workshopId: workshop.body.id });

    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Workshop is full"
      })
    );
  });

  // TODO: Ülesanne — Topeltbroneering → 409
    test("tagastab 409 kui kasutaja on juba broneerinud", async () => {
      const user = await request(app)
        .post("/users")
        .send({ name: "Test", email: "test@test.com" });

      const workshop = await request(app)
        .post("/workshops")
        .send({ title: "Testing", capacity: 10 });

      await request(app)
        .post("/bookings")
        .send({ userId: user.body.id, workshopId: workshop.body.id });

      const res = await request(app)
        .post("/bookings")
        .send({ userId: user.body.id, workshopId: workshop.body.id });

      expect(res.statusCode).toBe(409);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: "User already booked this workshop"
        })
      );
    });

  // TODO: Ülesanne — Olematu workshop → 404
    test("tagastab 404 kui workshop ei eksisteeri", async () => {
      const user = await request(app)
        .post("/users")
        .send({ name: "Test", email: "test@test.com" });

      const res = await request(app)
        .post("/bookings")
        .send({
          userId: user.body.id,
          workshopId: 9999
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          message: "Workshop not found"
        })
      );
    });

  // TODO: Edasijõudnud — Vigade struktuur
  test("error vastus sisaldab message välja", async () => {
    const res = await request(app)
      .post("/bookings")
      .send({});

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty("message");
  });

  // TODO: Edasijõudnud — Konkurentsuse test
  test("ainult üks broneering õnnestub kui 1 koht", async () => {
    const user1 = await request(app)
      .post("/users")
      .send({ name: "User1", email: "c1@test.com" });

    const user2 = await request(app)
      .post("/users")
      .send({ name: "User2", email: "c2@test.com" });

    const workshop = await request(app)
      .post("/workshops")
      .send({ title: "Testing", capacity: 1 });

    const responses = await Promise.allSettled([
      request(app).post("/bookings").send({
        userId: user1.body.id,
        workshopId: workshop.body.id
      }),
      request(app).post("/bookings").send({
        userId: user2.body.id,
        workshopId: workshop.body.id
      })
    ]);

    const successCount = responses.filter(
      r => r.value && r.value.statusCode === 201
    ).length;

    expect(successCount).toBe(1);
  });
});
