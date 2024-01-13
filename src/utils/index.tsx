import { faker } from "@faker-js/faker";

function uuid() {
  return faker.string.uuid();
}

function fullName() {
  return faker.person.firstName();
}

function firstName() {
  return faker.person.firstName();
}

function lastName() {
  return faker.person.lastName();
}

function age() {
  return faker.number.int({
    min: 18,
    max: 100,
  });
}

function gender() {
  const genderList = ["male", "female", "other"];

  return genderList[Math.floor(Math.random() * genderList.length)];
}

function email() {
  return faker.internet.email();
}

function boolean() {
  return Math.random() < 0.5;
}

export default {
  uuid,
  fullName,
  firstName,
  lastName,
  age,
  gender,
  email,
  boolean,
};
