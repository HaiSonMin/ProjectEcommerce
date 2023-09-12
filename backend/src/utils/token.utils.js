const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const createKeys = () => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");
  return { privateKey, publicKey };
};

const createTokenPair = async ({ payload={}, privateKey, publicKey }) => {
  const accessToken = JWT.sign(payload, publicKey, { expiresIn: "30m" });
  const refreshToken = JWT.sign(payload, privateKey, { expiresIn: "3d" });

  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) console.error(`Error verify:::${err}`);
    else console.error(`Decode verify:::${decode}`);
  });
  return { accessToken, refreshToken };
};

module.exports = { createKeys, createTokenPair };
