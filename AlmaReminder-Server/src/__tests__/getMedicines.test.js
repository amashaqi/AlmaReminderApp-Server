import supertest from "supertest";
import { createServer } from "../common/utils/createServer.js";
import { JwtToken } from "../common/JwtToken.js";
import { getUserAllMedicinesFlow } from "../mock/testing/getUserAllMedicinesFlow.js";
import * as Controller from "../common/Controller.js";
const app = createServer();

describe("medicine", () => {
  describe("get medicines route", () => {
    it("should return a 200", async () => {
      const findUser = jest
        .spyOn(Controller, "finMedicines")
        //@ts-ignore
        .mockReturnValueOnce(getUserAllMedicinesFlow);

      const { statusCode, body } = await supertest(app)
        .get("/v1/patient/medicines")
        .set("x-auth-token", JwtToken);

      expect(statusCode).toBe(200);
      expect(body).toEqual(getUserAllMedicinesFlow);
      expect(findUser).toHaveBeenCalled();
    });
  });
});
