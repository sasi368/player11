import { axiosCallMatches, axiosCallTeams } from "../../api/apiclient";
import { Config } from "../../api/Config";

export const getMatchPlayers = async (params: any) => {
  try {
    let res = await axiosCallMatches.post(Config.MATCH_DETAILS, params);
    return {
      status: true,
      data: res?.data?.data,
    };
  } catch (e) {
    console.log(e, "getMatchPlayers err");
    return {
      status: false,
      data: [],
    };
  }
};

export const createTeam = async (params: any) => {
  try {
    let res = await axiosCallTeams.post(Config.CREATE_TEAM, params);
    return {
      status: true,
      data: res?.data,
      msg: res?.data?.message,
    };
  } catch (e) {
    console.log(e, "createTeam err");
    return {
      status: false,
      data: [],
    };
  }
};

export const MyTeamListApi = async (params: any) => {
  try {
    let res = await axiosCallTeams.post(Config.GET_USER_TEAMS, params);
    return {
      status: true,
      data: res?.data,
      msg: res?.data?.message,
    };
  } catch (e) {
    console.log(e, "MyTeamListApi err");
    return {
      status: false,
      data: [],
    };
  }
};
