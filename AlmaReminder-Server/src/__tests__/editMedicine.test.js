import supertest from "supertest";
import { createServer } from "../common/utils/createServer.js";
import { JwtToken } from "../common/JwtToken.js";
import { editMedicineFlow } from "../mock/testing/editMedicineFlow.js";
import * as Controller from "../common/Controller.js";
const app = createServer();

const newMedicineInput = {
  medicineName: "New Med",
  timesADay: 2,
  numberOfPills: 9,
  description: "That is new type added to all.",
  initialDose: "11:12",
  customReminders: [],
};

const invalidInputType = {
  medicineName: "New Med",
  timesADay: "Asd",
  numberOfPills: 9,
  description: "That is new type added to all.",
  initialDose: "11:12",
  customReminders: [],
};

describe("medicine", () => {
  describe("Edit medicines route", () => {
    it("should return a 200", async () => {
      const addUser = jest
        .spyOn(Controller, "editMedicine")
        .mockReturnValueOnce(editMedicineFlow);

      const medicineId = "2";

      const { statusCode, body } = await supertest(app)
        .put(`/v1/patient/medicine/${medicineId}`)
        .set("x-auth-token", JwtToken)
        .send(newMedicineInput);

      expect(statusCode).toBe(200);
      expect(body).toEqual(editMedicineFlow);
      expect(addUser).toHaveBeenCalled();
    });
  });
});
afterEach(() => {
  jest.clearAllMocks();
});
describe("medicine", () => {
  describe("Edit medicines route", () => {
    it("should return a 400", async () => {
      const addUser = jest
        .spyOn(Controller, "editMedicine")
        .mockReturnValueOnce(editMedicineFlow);

      const medicineId = "2";

      const { statusCode, body } = await supertest(app)
        .put(`/v1/patient/medicine/${medicineId}`)
        .set("x-auth-token", JwtToken)
        .send(invalidInputType);

      expect(statusCode).toBe(400);
      expect(addUser).not.toHaveBeenCalled();
    });
  });
});
afterEach(() => {
  jest.clearAllMocks();
});
