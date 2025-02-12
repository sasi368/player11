//Login.tsx
export interface LoginValues {
  mobile_no: string;
  country_code: string;
  checked: boolean;
}

export interface LoginValueErrs {
  mobile_no?: string;
  country_code?: string;
}
export interface LoginApi {
  mobile_no: string;
  country_code: string;
}
export interface LoginDataRedux {
  mobile_no: string;
  country_code: string;
  token: string;
}

//verifyOTP.tsx
export interface otpValues {
  otp: string;
}
export interface otpValuesErrs {
  otp?: string;
}
