import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Images } from "../../../assets/Images/Images";
import { Colors } from "../../../Global/Theme/Colors";
import useDimensions from "../../../Global/Theme/useDimensions";
import AppButton from "../../../Global/Components/AppButton";
import { Fonts } from "../../../assets/Fonts/Fonts";
import AppText from "../../../Global/Components/AppText";

const Onboarding = (props: any) => {
  const dimensions = useDimensions();
  const theme = useContext(themeContext);
  const style = styles(theme);
  const translateY = useState(new Animated.Value(500))[0];

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={{ flex: 1, backgroundColor: theme.text }}>
        <View
          style={{ flex: 0.6, alignSelf: "center", justifyContent: "center" }}
        >
          <Image
            source={Images.onboarding}
            style={{
              width: dimensions.width,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
        </View>

        <Animated.View
          style={[style.bottomContentView, { transform: [{ translateY }] }]}
        >
          <ScrollView
            contentContainerStyle={{ alignItems: "center", padding: 20 }}
          >
            <Image
              source={Images.applogo}
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
            <AppText textType="bold18" style={style.loginTxt}>
              Welcome to Player 11
            </AppText>
            <AppText textType="semiBold12" style={style.loginTxt2}>
              Play fantasy cricket and win exciting rewards! Join millions of
              users in the ultimate fantasy sports experience.
            </AppText>

            <AppButton
              borderRadius={10}
              fontSize={14}
              fontColor={Colors.WHITE}
              fontFamily={Fonts.semiBold}
              height={40}
              value={"Get Started"}
              style={{ marginTop: 40 }}
              width={"90%"}
              alignSelf={"center"}
              onPress={() => {
                // Navigate to next screen
                props.navigation.navigate("Login");
              }}
            />
          </ScrollView>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    bottomContentView: {
      flex: 0.4,
      backgroundColor: theme.background,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
      textAlign: "center",
      marginBottom: 10,
    },
    description: {
      fontSize: 14,
      color: Colors.LIGHTGREY,
      textAlign: "center",
      paddingHorizontal: 20,
    },
    loginTxt: {
      color: theme.text,
      alignSelf: "center",
      marginTop: 10,
    },
    loginTxt2: {
      color: Colors.LIGHTGREY,
      alignSelf: "center",
      width: "90%",
      textAlign: "center",
    },
  });
