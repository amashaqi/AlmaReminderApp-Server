import supertest from "supertest";
import { createServer } from "../common/utils/createServer.js";
import { JwtToken } from "../common/JwtToken.js";
import { addMedicineFlow } from "../mock/testing/addMedicineFlow.js";
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
  describe("Add medicines route", () => {
    it("should return a 201", async () => {
      const addUser = jest
        .spyOn(Controller, "addMedicine")
        .mockReturnValueOnce(addMedicineFlow);

      const { statusCode, body } = await supertest(app)
        .post("/v1/patient/medicine")
        .set("x-auth-token", JwtToken)
        .send(newMedicineInput);

      expect(statusCode).toBe(201);
      expect(body).toEqual(addMedicineFlow);
      expect(addUser).toHaveBeenCalled();
    });
  });
});
afterEach(() => {
  jest.clearAllMocks();
});
describe("medicine", () => {
  describe("Add medicines route", () => {
    it("should return a 400", async () => {
      const addUser = jest
        .spyOn(Controller, "addMedicine")
        .mockReturnValueOnce(addMedicineFlow);

      const { statusCode, body } = await supertest(app)
        .post("/v1/patient/medicine")
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
