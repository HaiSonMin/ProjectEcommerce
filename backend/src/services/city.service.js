const { BadRequestError } = require("../core/error.response");

const axios = require("axios").create({
  baseURL: "https://provinces.open-api.vn/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

class CityService {
  static async getAllCities(req, res) {
    const result = await axios({
      method: "GET",
    });
    if (!result) throw new BadRequestError("Lấy dữ liệu city thất bại");
    return result.data;
  }

  static async getAllDistricts(req, res) {
    const { cityCode } = req.params;
    const result = await axios({
      url: `p/${cityCode}/?depth=2`,
      method: "GET",
    });
    if (!result) throw new BadRequestError("Lấy dữ liệu district thất bại");
    return result.data;
  }

  static async getAllWards(req, res) {
    const { districtCode } = req.params;
    const result = await axios({
      url: `d/${districtCode}/?depth=2`,
      method: "GET",
    });
    if (!result) throw new BadRequestError("Lấy dữ liệu wards thất bại");
    return result.data;
  }
}

module.exports = CityService;
