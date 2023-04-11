import supertest from "supertest";
import { createServer } from "../common/utils/createServer.js";
import { JwtToken } from "../common/JwtToken.js";
import { deleteMedicineFlow } from "../mock/testing/deleteMedicineFlow.js";

import * as Controller from "../common/Controller.js";

const app = createServer();

describe("medicine", () => {
  describe("Delete medicines route", () => {
    it("should return a 200", async () => {
      const deleteUser = jest
        .spyOn(Controller, "deleteMedicine")
        .mockReturnValueOnce(deleteMedicineFlow);

      const medicineId = "2";

      const { statusCode, body } = await supertest(app)
        .delete(`/v1/patient/medicine/${medicineId}`)
        .set("x-auth-token", JwtToken);

      expect(statusCode).toBe(200);
      expect(body).toEqual(deleteMedicineFlow);
      expect(deleteUser).toHaveBeenCalled();
    });
  });
});
afterEach(() => {
  jest.clearAllMocks();
});
