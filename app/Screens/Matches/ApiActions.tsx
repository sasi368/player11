import { Config } from "../../api/Config";
import { axiosCallMatches } from "../../api/apiclient";

export const upcomingMatchListApi = async () => {
  try {
    let res = await axiosCallMatches.get(Config.UPCOMINGMATCHES);
    return {
      status: res.data?.status,
      data: res.data?.data,
      msg: res.data.message,
    };
  } catch (e) {
    console.log(e, "upcomingMatchListApi err");
    return {
      status: false,
      data: [],
    };
  }
};
