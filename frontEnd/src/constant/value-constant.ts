class Constant {
  LIMIT_PAGE: number;
  SORT_DEFAULT: string;
  MAX_UPLOAD_IMAGE: number;
  TIME_ONE_DAY: number;
  constructor() {
    this.LIMIT_PAGE = 10;
    this.MAX_UPLOAD_IMAGE = 10;
    this.SORT_DEFAULT = "ctime";
    this.TIME_ONE_DAY = 24 * 60 * 60 * 1000;
  
  }
}

const CONSTANT = new Constant();

export default CONSTANT;
