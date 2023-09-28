class Constant {
  LIMIT_PAGE: number;
  SORT_DEFAULT: string;
  MAX_UPLOAD_IMAGE: number;
  TIME_ONE_DAY: number;
  REGEX_PHONE: any;
  REGEX_EMAIL: any;
  AT_NAME_LOCAL_STORE: string;
  USER_NAME_LOCAL_STORE: string;
  TIME_EXPIRE_OTP: number;
  constructor() {
    this.LIMIT_PAGE = 10;
    this.MAX_UPLOAD_IMAGE = 10;
    this.SORT_DEFAULT = "ctime";
    this.TIME_ONE_DAY = 24 * 60 * 60 * 1000;
    this.REGEX_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    this.REGEX_EMAIL = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    this.AT_NAME_LOCAL_STORE = "accessToken";
    this.USER_NAME_LOCAL_STORE = "user";
    this.TIME_EXPIRE_OTP = 120; // 120 second
  }
}

const CONSTANT = new Constant();

export default CONSTANT;
