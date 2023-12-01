class Constant {
  LIMIT_DEFAULT: number;
  PAGE_DEFAULT: number;
  SORT_DEFAULT: string;
  MAX_UPLOAD_IMAGE: number;
  TIME_ONE_DAY: number;
  REGEX_PHONE: any;
  REGEX_EMAIL: any;
  TIME_EXPIRE_OTP: number;
  constructor() {
    this.LIMIT_DEFAULT = 10;
    this.PAGE_DEFAULT = 1;
    this.SORT_DEFAULT = 'ctime';
    this.MAX_UPLOAD_IMAGE = 10;
    this.TIME_ONE_DAY = 24 * 60 * 60 * 1000;
    this.REGEX_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    this.REGEX_EMAIL = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

    this.TIME_EXPIRE_OTP = 120; // 120 second
  }
}

const CONSTANT = new Constant();

export default CONSTANT;
