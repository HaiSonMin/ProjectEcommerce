const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const createDoubleKeys = () => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");
  return { privateKey, publicKey };
};

const createDoubleKeysV2 = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
  return { privateKey, publicKey };
};

const createTokenPair = async ({ payload = {}, privateKey, publicKey }) => {
  const accessToken = JWT.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
  const refreshToken = JWT.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });

  // Check AT have valid
  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) console.error(`Error verify:::${err}`);
    else console.log(`accessToken decode success`);
  });

  JWT.verify(refreshToken, publicKey, (err, decode) => {
    if (err) console.error(`Error verify:::${err}`);
    else console.log(`refreshToken decode success`);
  });

  return { accessToken, refreshToken };
};

module.exports = { createDoubleKeys, createDoubleKeysV2, createTokenPair };
