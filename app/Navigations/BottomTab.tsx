import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import themeContext from "../Global/Theme/themeContext";
import BottomTabContents from "./BottomTabContents";
import { AppIcons } from "../Global/Components/AppIcons";
import { Colors } from "../Global/Theme/Colors";
//screens
import { UpcomingMatches, UserMatches } from "../Screens/Matches/Screens";

const Tab = createBottomTabNavigator();

const OptionLists = [
  {
    route: "UpcomingBottomTab",
    label: "Upcoming",
    type: AppIcons.Foundation,
    icon: "home",
    component: UpcomingMatches,
    color: Colors.PRIMARY,
  },

  {
    route: "UserMatchesBottomTab",
    label: "My Matches",
    type: AppIcons.MaterialIcons,
    icon: "emoji-events",
    component: UserMatches,
    color: Colors.PRIMARY,
  },
];

export default function BottomTab() {
  const theme = useContext(themeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,

        tabBarLabelStyle: {
          fontSize: 12,
          color: Colors.WHITE,
        },
        tabBarStyle: {
          height: 55,
          backgroundColor: theme.background,
          borderTopColor: Colors.LIGHTGREY,
          borderTopWidth: 0.5,
        },
      }}
    >
      {OptionLists?.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => (
                <BottomTabContents {...props} item={item} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
