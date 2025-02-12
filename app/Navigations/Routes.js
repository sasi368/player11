import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { SafeAreaView } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../Global/Theme/themeContext";
import theme from "../Global/Theme/theme";
import { Colors } from "../Global/Theme/Colors";
import { getThemeStatus, saveTheme } from "../Global/Theme/setTheme";

const Routes = () => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    checkThemeStatus();
  }, []);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
        saveTheme(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  const checkThemeStatus = async () => {
    const { status } = await getThemeStatus();
    setMode(status);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            mode === true
              ? theme.light.cardBackground
              : theme.dark.cardBackground,
        }}
      >
        <themeContext.Provider value={mode === true ? theme.light : theme.dark}>
          <NavigationContainer theme={mode === true ? DefaultTheme : DarkTheme}>
            <StackNavigator />
          </NavigationContainer>
        </themeContext.Provider>
      </SafeAreaView>
    </>
  );
};
export default Routes;
