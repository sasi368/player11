import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import BottomTab from "./BottomTab";
import useDimensions from "../Global/Theme/useDimensions";
import { Colors } from "../Global/Theme/Colors";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { width } = useDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.BLACK,
          width: width >= 1100 ? width * 0.3 : width * 0.8,
        },
      }}
    >
      <Drawer.Screen
        name={"DrawerHome"}
        component={BottomTab}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;
