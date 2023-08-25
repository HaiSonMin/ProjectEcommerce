class Constant {
  LIMIT_PAGE: number;
  SORT_DEFAULT: string;
  MAX_UPLOAD_IMAGE: number;
  RAM: object;
  ROM: object;
  constructor() {
    this.LIMIT_PAGE = 10;
    this.MAX_UPLOAD_IMAGE = 10;
    this.SORT_DEFAULT = "ctime";
    this.ROM = {
      "32GB": "32GB",
      "64GB": "64GB",
      "128GB": "128GB",
      "256GB": "256GB",
      "512GB": "512GB",
      "1TB": "1TB",
    };
    this.RAM = {
      "4GB": "32GB",
      "6GB": "64GB",
      "8GB": "128GB",
      "12GB": "258GB",
      "16GB": "512GB",
      "24GB": "24GB",
    };
  }
}

const CONSTANT = new Constant();

export default CONSTANT;
