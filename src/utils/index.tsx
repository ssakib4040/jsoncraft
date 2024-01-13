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

function phone() {
  return faker.phone.number();
}

function boolean() {
  return Math.random() < 0.5;
}

function profileImage() {
  return faker.image.avatar();
}

function password() {
  return faker.internet.password();
}

function username() {
  return faker.internet.userName();
}

function imei() {
  return faker.phone.imei();
}

function color() {
  return faker.color.rgb();
}

function productName() {
  return faker.commerce.productName();
}

function product() {
  return faker.commerce.product();
}

function productPrice() {
  return faker.commerce.price();
}

function companyName() {
  return faker.company.name();
}

function date() {
  return faker.date.anytime();
}

function bitcoinAddress() {
  return faker.finance.bitcoinAddress();
}

function creditCard() {
  return faker.finance.creditCardNumber();
}

function ethereumAddress() {
  return faker.finance.ethereumAddress();
}
function pin() {
  return faker.finance.account();
}

function imageUrl() {
  return faker.image.url();
}

function imageBase64() {
  return faker.image.dataUri();
}

function emoji() {
  return faker.internet.emoji();
}

function ip() {
  return faker.internet.ip();
}

function ipv4() {
  return faker.internet.ipv4();
}

function ipv6() {
  return faker.internet.ipv6();
}

function mac() {
  return faker.internet.mac();
}

function city() {
  return faker.location.city();
}

function country() {
  return faker.location.country();
}

function countryCode() {
  return faker.location.countryCode();
}

function street() {
  return faker.location.street();
}

function streetAddress() {
  return faker.location.streetAddress();
}

function timeZone() {
  return faker.location.timeZone();
}

function zipCode() {
  return faker.location.zipCode();
}

export default {
  uuid,
  fullName,
  firstName,
  lastName,
  age,
  gender,
  email,
  phone,
  boolean,
  profileImage,
  password,
  username,
  imei,
  color,
  productName,
  product,
  productPrice,
  companyName,
  date,
  bitcoinAddress,
  creditCard,
  ethereumAddress,
  pin,
  imageUrl,
  imageBase64,
  emoji,
  ip,
  ipv4,
  ipv6,
  mac,
  city,
  country,
  countryCode,
  street,
  streetAddress,
  timeZone,
  zipCode,
};
