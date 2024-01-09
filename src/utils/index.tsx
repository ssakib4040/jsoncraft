function generateID() {
  return Math.random().toString(36).substr(2, 9);
}

function generateNumber() {
  return Math.floor(Math.random() * 100);
}

function generateBoolean() {
  return Math.random() < 0.5;
}

function generateString() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;

  let result = "";

  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function generateRandomDate() {
  return new Date().toISOString();
}

export default {
  generateID,
  generateNumber,
  generateBoolean,
  generateString,
  generateRandomDate,
};
