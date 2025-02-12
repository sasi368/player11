import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Fonts } from "../../../assets/Fonts/Fonts";
import { Colors } from "../../../Global/Theme/Colors";
import { useContext } from "react";
import themeContext from "../../../Global/Theme/themeContext";
import PlayerList from "./PlayerList";

const Tab = createMaterialTopTabNavigator();

export function CreateTeamTab(props: any) {
  const theme = useContext(themeContext);
  const { playerLists, rolesAvailable } = props;

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
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
      {rolesAvailable?.map((role: any, index: any) => {
        return (
          <Tab.Screen
            key={role}
            name={`${role}`}
            options={{
              title: `${role}`,
            }}
            component={PlayerList}
            initialParams={{
              name: role,
              players: playerLists.flatMap((item: any) =>
                item?.players?.filter(
                  (player: any) =>
                    player.role === role && !player?.isSupportStaff
                )
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
