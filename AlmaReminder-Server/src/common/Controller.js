import { ServiceError } from "../models/error/ServiceError.js";
import { userMedicine } from "../mock/patients/patientsMedicines.js";
import { v4 as uuid_v4 } from "uuid";
import redis from "redis";

export const finMedicines = async (userMedicine, req) => {
  return await userMedicine.find((element) => element.id === req.user.id);
};

export const addMedicine = async (userMedicine, req) => {
  const oldMedicines = await userMedicine.find(
    (element) => element.id === req.user.id
  ).medicines;
  const newMedicine = {
    id: uuid_v4(),
    ...req.body,
  };
  userMedicine.find((element) => element.id === req.user.id).medicines = await [
    ...oldMedicines,
    newMedicine,
  ];
  return userMedicine.find((element) => element.id === req.user.id);
};

export const editMedicine = async (userMedicine, req) => {
  let rediClient;
  (async () => {
    rediClient = redis.createClient();
    rediClient.on("error", (error) => console.log("redis eror" + error));
    await rediClient.connect();
  })();
  const updatedMedicine = { id: req.params.id, ...req.body };
  const requestBody = await rediClient.get("requestBody");
  if (JSON.stringify(updatedMedicine) === requestBody) {
    const cachedData = await rediClient.get("medicines");
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } else {
    let index = await userMedicine
      .find((element) => element.id === req.user.id)
      .medicines.findIndex((med) => med.id === req.params.id);
    if (index < 0) {
      throw new ServiceError(
        "Invalid Request: medicine does not exist found",
        400
      );
    }

    userMedicine.find((element) => element.id === req.user.id).medicines[
      index
    ] = await updatedMedicine;
    const editMedRes = await userMedicine.find(
      (element) => element.id === req.user.id
    );
    await rediClient.set("medicines", JSON.stringify(editMedRes));
    await rediClient.set("requestBody", JSON.stringify(updatedMedicine));
    return await editMedRes;
  }
};

export const deleteMedicine = async (userMedicine, req) => {
  let indexOfDeleteMed = await userMedicine
    .find((element) => element.id === req.user.id)
    .medicines.findIndex((med) => med.id === req.params.id);
  if (indexOfDeleteMed < 0) {
    throw new ServiceError(
      "Invalid Request: medicine does not exist found",
      401
    );
  }
  await userMedicine
    .find((element) => element.id === req.user.id)
    .medicines.splice(indexOfDeleteMed, 1);
  return userMedicine.find((element) => element.id === req.user.id).medicines;
};

export const addUser = (users, req) => {
  const id = uuid_v4();
  const newUser = {
    _id: id,
    ...req.body,
    roles: ["viewer"],
  };
  userMedicine.push({
    email: req.body.email,
    userName: req.body.userName,
    id: id,
    medicines: [],
  });
  users.push(newUser);
  return newUser;
};
