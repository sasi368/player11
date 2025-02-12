import { Config } from "../../api/Config";
import { axiosCallUser } from "../../api/apiclient";
import { LoginApi } from "./Interfaces";

export const SignInApi = async (params: LoginApi) => {
  try {
    let res = await axiosCallUser.post(Config.LOGIN, params);
    return {
      status: res.data?.status,
      data: res.data,
      msg: res?.data?.message,
    };
  } catch (e: any) {
    console.log(e?.response?.data, "SignInApi err");
    return {
      status: false,
      apiErr: e?.response?.data.errors,
      errData: e,
    };
  }
};
