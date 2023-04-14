import supertest from "supertest";
import { createServer } from "../common/utils/createServer.js";
import { addUserFlow } from "../mock/testing/addUserFlow.js";
import * as Controller from "../common/Controller.js";
const app = createServer();

const newUserInput = {
  email: "ala@gmail.com",
  userName: "alaa",
  password: "$2b$15$7HwV7T5/DzJab1OjKiD2SezrMdqkOQmI9dhvf/NIm.DVkaHJuli.G",
};

describe("users", () => {
  describe("Add user route", () => {
    it("should return a 201", async () => {
      const addUser = jest
        .spyOn(Controller, "addUser")
        .mockReturnValueOnce(addUserFlow);

      const { statusCode, body } = await supertest(app)
        .post("/v1/patient/user")
        .send(newUserInput);

      expect(statusCode).toBe(201);
      expect(body).toEqual(addUserFlow);
      expect(addUser).toHaveBeenCalled();
    });
  });
});
