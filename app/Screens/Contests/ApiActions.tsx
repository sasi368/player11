import { axiosCallContests } from "../../api/apiclient";
import { Config } from "../../api/Config";

export const getContestList = async () => {
  try {
    let res = await axiosCallContests.get(`${Config.GET_CONTESTS}`);

    return {
      status: true,
      data: res?.data?.data,
    };
  } catch (e) {
    console.log(e, "getContestList err");
    return {
      status: false,
      data: [],
    };
  }
};

export const joinContest = async (params: any) => {
  try {
    let res = await axiosCallContests.post(Config.JOIN_CONTEST, params);
    console.log("sldgjsdgdsg", res);

    return {
      status: true,
      data: res?.data?.data,
      msg: res?.data?.message,
    };
  } catch (e) {
    console.log(e?.response?.data?.message, "joinContest err");
    return {
      status: false,
      data: [],
      msg: e?.response?.data?.message,
    };
  }
};

export const getUserContests = async (params: any) => {
  try {
    let res = await axiosCallContests.post(Config.GET_USER_CONTEST, params);

    return {
      status: true,
      data: res?.data?.data,
      msg: res?.data?.message,
    };
  } catch (e) {
    console.log(e, "getUserContests err");
    return {
      status: false,
      data: [],
    };
  }
};
