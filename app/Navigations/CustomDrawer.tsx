import React, { useContext } from "react";
import { ScrollView } from "react-native";
import themeContext from "../Global/Theme/themeContext";
function CustomDrawer() {
  const theme = useContext(themeContext);
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: theme.cardBackground }}
    ></ScrollView>
  );
}
export default CustomDrawer;
