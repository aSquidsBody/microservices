import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  // Expect NotAuthorizedError
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  // Do NOT expect NotAuthorizedError
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  // Expect RequestValidationError
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  // Expect RequestValidationError
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  // Expect RequestValidationError
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "aweaf3",
      price: -10,
    })
    .expect(400);

  // Expect RequestValidationError
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "aewafef",
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  // get *all* tickets in the database
  // (note they were deleted in the 'beforeEach' function)
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "adsfe",
      price: 20,
    })
    .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
});
