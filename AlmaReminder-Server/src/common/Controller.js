import { ServiceError } from "../models/error/ServiceError.js";
import { userMedicine } from "../mock/patients/patientsMedicines.js";

export const finMedicines = (userMedicine, req) => {
  return userMedicine.find((element) => element.id === req.user.id);
};

export const addMedicine = (userMedicine, req) => {
  const oldMedicines = userMedicine.find(
    (element) => element.id === req.user.id
  ).medicines;
  const newMedicine = {
    id:
      oldMedicines.length > 0
        ? oldMedicines[oldMedicines.length - 1].id + 1
        : 1,
    ...req.body,
  };
  userMedicine.find((element) => element.id === req.user.id).medicines = [
    ...oldMedicines,
    newMedicine,
  ];
  return userMedicine.find((element) => element.id === req.user.id);
};

export const editMedicine = (userMedicine, req) => {
  const updatedMedicine = { id: parseInt(req.params.id), ...req.body };
  let index = userMedicine
    .find((element) => element.id === req.user.id)
    .medicines.findIndex((med) => med.id === parseInt(req.params.id));
  if (index < 0) {
    throw new ServiceError(
      "Invalid Request: medicine does not exist found",
      401
    );
  }
  userMedicine.find((element) => element.id === req.user.id).medicines[index] =
    updatedMedicine;
  return userMedicine.find((element) => element.id === req.user.id);
};

export const deleteMedicine = (userMedicine, req) => {
  let indexOfDeleteMed = userMedicine
    .find((element) => element.id === req.user.id)
    .medicines.findIndex((med) => med.id === parseInt(req.params.id));
  if (indexOfDeleteMed < 0) {
    throw new ServiceError(
      "Invalid Request: medicine does not exist found",
      401
    );
  }
  userMedicine
    .find((element) => element.id === req.user.id)
    .medicines.splice(indexOfDeleteMed, 1);
  return userMedicine.find((element) => element.id === req.user.id).medicines;
};

export const addUser = (users, req) => {
  const id = users.length > 0 ? users[users.length - 1]._id + 1 : 1;
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
