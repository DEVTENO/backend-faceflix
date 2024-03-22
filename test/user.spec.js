import supertest from "supertest";
import { app } from "../src/application/app";
import mongoose from "mongoose";
import userTest from "./utils/user-test";

describe("Users API", () => {
  describe("POST /api/users/register", () => {
    afterEach(async () => {
      await userTest.deleteAll();
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("should create user", async () => {
      const result = await supertest(app).post("/api/users/register").send({
        email: "test@gmail.com",
        password: "testing",
      });

      expect(result.status).toBe(201);
      expect(result.body.data).toBe("OK");
    });

    it("should reject if data invalid", async () => {
      const result = await supertest(app).post("/api/users/register").send({
        email: "",
        password: "",
      });

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });

    it("should user already exist", async () => {
      await supertest(app).post("/api/users/register").send({
        email: "test@gmail.com",
        password: "testing",
      });
      const result = await supertest(app).post("/api/users/register").send({
        email: "test@gmail.com",
        password: "testing",
      });

      expect(result.status).toBe(400);
      expect(result.body.errors).toBe("user already exist");
    });
  });
});
