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
      .send({ name: "Ada", email: "ada@test.com" });

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
  test.todo("tagastab 409 kui workshop on täis");

  // TODO: Ülesanne — Topeltbroneering → 409
  test.todo("tagastab 409 kui kasutaja on juba broneerinud");

  // TODO: Ülesanne — Olematu workshop → 404
  test.todo("tagastab 404 kui workshop ei eksisteeri");

  // TODO: Edasijõudnud — Vigade struktuur
  test.todo("error vastus sisaldab error välja");

  // TODO: Edasijõudnud — Konkurentsuse test
  test.todo("ainult üks broneering õnnestub kui 1 koht");
});
