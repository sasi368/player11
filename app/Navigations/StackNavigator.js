import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//bottom tab
import { Colors } from "../Global/Theme/Colors";
import { ScreenTransactions } from "./Animations";
//drawer tab
import DrawerNavigator from "./Drawer";
//App Screens
import {
  Login,
  Onboarding,
  Splash,
  VerifyOTP,
} from "../Screens/Initial/Screens";
import {
  UpcomingMatches,
  MatchDetails,
  UserMatches,
} from "../Screens/Matches/Screens";
import {
  ConfirmTeam,
  CreateTeam,
  PreviewTeam,
  UserTeamList,
} from "../Screens/Teams/Screens";
import { UserContestList } from "../Screens/Contests/Screens";

const StackComponent = createNativeStackNavigator();

const StackNavigator = (props) => {
  return (
    <>
      <Suspense
        fallback={<ActivityIndicator size={"small"} color={Colors.WHITE} />}
      >
        <StackComponent.Navigator
          initialRouteName={"Splash"}
          screenOptions={ScreenTransactions}
        >
          {/* initial screens */}
          <StackComponent.Screen name={"Splash"} component={Splash} />
          <StackComponent.Screen name={"Onboarding"} component={Onboarding} />
          <StackComponent.Screen name={"Login"} component={Login} />
          <StackComponent.Screen name={"VerifyOTP"} component={VerifyOTP} />

          {/* Match screens */}
          <StackComponent.Screen
            name={"UpcomingMatches"}
            component={UpcomingMatches}
          />
          <StackComponent.Screen
            name={"MatchDetails"}
            component={MatchDetails}
          />
          <StackComponent.Screen name={"UserMatches"} component={UserMatches} />

          {/* Team Screens */}
          <StackComponent.Screen name={"CreateTeam"} component={CreateTeam} />
          <StackComponent.Screen name={"ConfirmTeam"} component={ConfirmTeam} />
          <StackComponent.Screen name={"PreviewTeam"} component={PreviewTeam} />
          <StackComponent.Screen
            name={"UserTeamList"}
            component={UserTeamList}
          />

          {/* home screens */}
          <StackComponent.Screen
            name={"HomeBottom"}
            children={() => <DrawerNavigator />}
          />
        </StackComponent.Navigator>
      </Suspense>
    </>
  );
};
export default StackNavigator;
