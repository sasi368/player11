import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Fonts } from "../../../assets/Fonts/Fonts";
import { Colors } from "../../../Global/Theme/Colors";
import { useContext, useState } from "react";
import themeContext from "../../../Global/Theme/themeContext";
import { useFocusEffect } from "@react-navigation/native";
//api calls
import { getContestList, getUserContests } from "../../Contests/ApiActions";
import { ContestList } from "../../Contests/Screens";
import UserContestList from "../../Contests/Screens/UserContestList";
import { MyTeamListApi } from "../../Teams/ApiActions";
import { UserTeamList } from "../../Teams/Screens";
import isEmpty from "../../../Global/Helper/isEmpty";
//components

const Tab = createMaterialTopTabNavigator();

export function MatchDetailsTab() {
  const theme = useContext(themeContext);
  const [isLoader, setLoader] = useState(false);
  const [allContestList, setAllContestList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [myContestList, setMyContestList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getContests();
      MyTeamCall();
      MyContestCall();
    }, [])
  );

  const getContests = async () => {
    try {
      setLoader(true);
      const { data } = await getContestList();

      setLoader(false);
      setAllContestList(data);
    } catch (e) {
      setLoader(false);
      console.log(e, "getAllContests err");
    }
  };

  const MyTeamCall = async () => {
    try {
      setLoader(true);

      let params = {
        userId: global.userData?.user?._id,
      };
      const { status, data } = await MyTeamListApi(params);
      setLoader(false);
      if (status) {
        setTeamList(data?.teams);
      }
    } catch (e) {
      console.log(e, "MyTeamCall err");
      setLoader(false);
    }
  };

  const MyContestCall = async () => {
    try {
      if (isEmpty(myContestList)) {
        setLoader(true);
      }

      let params = {
        userId: global.userData?.user?._id,
      };
      const { status, data } = await getUserContests(params);
      setLoader(false);
      setMyContestList(data);
    } catch (e) {
      console.log(e, "MyTeamCall err from MyContests");
      setLoader(false);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          textTransform: "none",
          fontSize: 12,
          fontFamily: Fonts.semiBold,
        },
        tabBarIndicatorStyle: {
          borderBottomWidth: 5,
          borderColor: Colors.PRIMARY,
        },
        tabBarActiveTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.cardBackground },
      }}
    >
      <Tab.Screen name="All Contests">
        {(props) => (
          <ContestList
            {...props}
            isLoader={isLoader}
            contestList={allContestList}
            teamList={teamList}
            refreshFunctions={MyContestCall}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="My Contests">
        {(props) => (
          <UserContestList
            {...props}
            isLoader={isLoader}
            contestList={myContestList}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="My Teams">
        {(props) => (
          <UserTeamList {...props} isLoader={isLoader} teamList={teamList} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
