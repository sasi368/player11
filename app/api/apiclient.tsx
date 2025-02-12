import axios from "axios";
import isEmpty from "../Global/Helper/isEmpty";
import { Config } from "./Config";

//User apis
let axiosCallUser = axios.create({
  baseURL: Config.USER_API_URL,
  timeout: 100000,
});
axiosCallUser.interceptors.request.use(
  async (configure) => {
    if (!isEmpty(global.token)) {
      configure.headers.Authorization = global.token;
    }
    return configure;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//match apis
let axiosCallMatches = axios.create({
  baseURL: Config.MATCH_API_URL,
  timeout: 100000,
});
axiosCallMatches.interceptors.request.use(
  async (configure) => {
    if (!isEmpty(global.token)) {
      configure.headers.Authorization = global.token;
    }
    return configure;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//team apis
let axiosCallTeams = axios.create({
  baseURL: Config.TEAM_API_URL,
  timeout: 100000,
});
axiosCallMatches.interceptors.request.use(
  async (configure) => {
    if (!isEmpty(global.token)) {
      configure.headers.Authorization = global.token;
    }
    return configure;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//contest apis
let axiosCallContests = axios.create({
  baseURL: Config.CONTEST_API_URL,
  timeout: 100000,
});
axiosCallMatches.interceptors.request.use(
  async (configure) => {
    if (!isEmpty(global.token)) {
      configure.headers.Authorization = global.token;
    }
    return configure;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosCallUser, axiosCallMatches, axiosCallTeams, axiosCallContests };
