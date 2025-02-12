import React, { useContext } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Colors } from "../../../Global/Theme/Colors";
import { Images } from "../../../assets/Images/Images";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../../../services/EncryptedStorage";
import isEmpty from "../../../Global/Helper/isEmpty";
import { useDispatch } from "react-redux";
import useDimensions from "../../../Global/Theme/useDimensions";

const Splash = (props: any) => {
  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const dimensions = useDimensions();

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      checkUserToken();
      return () => {};
    }, [])
  );

  const checkUserToken = async () => {
    const { token, storedResult, status } = await getData("UserData");
    if (!isEmpty(token)) {
      global.token = token;
      global.userData = storedResult?.userData;
      props.navigation.navigate("HomeBottom");
    } else {
      setTimeout(() => {
        props.navigation.navigate("Onboarding");
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        translucent={false}
        barStyle={"light-content"}
        backgroundColor={Colors.BLACK}
      />
      <Image
        source={Images.applogo}
        style={{
          width: dimensions.width * 0.5,
          height: dimensions.height * 0.5,
          resizeMode: "contain",
        }}
      />
    </SafeAreaView>
  );
};
export default Splash;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.BLACK,
      alignItems: "center",
      justifyContent: "center",
    },
  });
