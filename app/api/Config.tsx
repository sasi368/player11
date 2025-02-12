"use strict";

let isApplive = true;
let BASE_URL;
let DEMO_USER_API_URL =
  "https://9cb0-2409-40f4-1029-52bf-7457-2956-23f8-b66.ngrok-free.app/api/";
let USER_API_URL;
let MATCH_API_URL;
let TEAM_API_URL;
let CONTEST_API_URL;

if (isApplive) {
  BASE_URL = DEMO_USER_API_URL;
  USER_API_URL = `${DEMO_USER_API_URL}users`;
  MATCH_API_URL = `${DEMO_USER_API_URL}matches`;
  TEAM_API_URL = `${DEMO_USER_API_URL}teams`;
  CONTEST_API_URL = `${DEMO_USER_API_URL}contests`;
} else {
  BASE_URL = DEMO_USER_API_URL;
  USER_API_URL = "";
  MATCH_API_URL = "";
  TEAM_API_URL = "";
  CONTEST_API_URL = "";
}

export const Config = {
  version: "1.0.0",

  isApplive: isApplive,
  BASE_URL: BASE_URL,
  USER_API_URL: USER_API_URL,
  MATCH_API_URL: MATCH_API_URL,
  TEAM_API_URL: TEAM_API_URL,
  CONTEST_API_URL: CONTEST_API_URL,

  //users
  LOGIN: "/register",
  //matches
  UPCOMINGMATCHES: "/upcomingMatches",
  MATCH_DETAILS: "/matchDetails",
  //team
  CREATE_TEAM: "/createTeam",
  GET_USER_TEAMS: "/getTeams",
  //contests
  GET_CONTESTS: "/getContests",
  JOIN_CONTEST: "/joinContest",
  GET_USER_CONTEST: "/joinContestList",
};
