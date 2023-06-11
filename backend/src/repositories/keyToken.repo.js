const { KeyTokenModel } = require("../models");
class KeyTokenRepository {
  static async findRefreshTokenUsing(refreshToken) {
    return await KeyTokenModel.findOne({
      keytoken_refreshTokenUsing: refreshToken,
    });
  }

  static async deleteTokenByRefreshToken(refreshToken) {
    const keyDeleted = await KeyTokenModel.findOneAndDelete({
      keytoken_refreshTokenUsing: refreshToken,
    })
      .lean()
      .exec();
    return keyDeleted;
  }
}
module.exports = KeyTokenRepository;
