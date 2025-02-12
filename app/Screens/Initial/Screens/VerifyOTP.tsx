import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Images } from "../../../assets/Images/Images";
import { Colors } from "../../../Global/Theme/Colors";
import { onChangeValues } from "../../../Global/Helper/InputHandler";
import { Fonts } from "../../../assets/Fonts/Fonts";
import AppButton from "../../../Global/Components/AppButton";
import { OtpInput } from "react-native-otp-entry";

import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { otpValues } from "../Interfaces";
import { useSelector } from "react-redux";
import isEmpty from "../../../Global/Helper/isEmpty";
import AppLoader from "../../../Global/Components/AppLoader";
import { storeData } from "../../../services/EncryptedStorage";
import { displayToast } from "../../../Global/Components/Toast";
import AppText from "../../../Global/Components/AppText";

const initialInputsState: otpValues = {
  otp: "",
};

const VerifyOTP = (props: any) => {
  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const translateY = useState(new Animated.Value(500))[0]; // Initial position off-screen

  const loginDatas = useSelector(
    (state: any) => state.loginDataReducer.loginData
  );
  const [isLoading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<otpValues>(initialInputsState);

  useEffect(() => {
    // Animate the white layer from bottom to top on mount
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOnchange = (text: string | boolean, input: string) => {
    const { values } = onChangeValues({ text, input });
    setInputs(values);
  };

  const VerifyapiCall = async () => {
    global.token = loginDatas?.token;
    global.userData = loginDatas?.userData;
    const { storedResult, status } = await storeData(loginDatas, "UserData");
    props.navigation.navigate("HomeBottom");
  };

  return (
    <SafeAreaView style={style.container}>
      <AppLoader loading={isLoading} />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.text,
        }}
      >
        <View style={{ flex: 0.35 }}>
          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon
                type={AppIcons.Ionicons}
                name={"chevron-back"}
                size={25}
                color={theme.background}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View
          style={[
            style.bottomContentView,
            { transform: [{ translateY }] }, // Apply bottom-to-top animation
          ]}
        >
          <ScrollView>
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
              OTP Verification
            </AppText>

            <AppText textType="semiBold12" style={style.loginTxt2}>
              Please Enter 6 digits OTP send to your mobile number.
            </AppText>

            <View style={{ marginTop: 20 }} />

            <View style={{ alignItems: "center", marginHorizontal: 20 }}>
              <OtpInput
                numberOfDigits={6}
                focusColor={Colors.GREEN}
                autoFocus={false}
                hideStick={false}
                placeholder="******"
                blurOnFilled={true}
                disabled={false}
                type="numeric"
                secureTextEntry={false}
                focusStickBlinkingDuration={500}
                onFocus={() => console.log("Focused")}
                onBlur={() => console.log("Blurred")}
                onTextChange={(text) => {
                  handleOnchange(text, "otp");
                }}
                // onFilled={(text: String) => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                theme={{
                  pinCodeTextStyle: {
                    color: theme.text,
                    fontSize: 16,
                    fontFamily: Fonts?.Bold,
                  },
                  pinCodeContainerStyle: {
                    backgroundColor: theme.cardBackground,
                    borderColor: "transparent",
                  },
                  placeholderTextStyle: {
                    color: theme.text,
                    fontSize: 16,
                    fontFamily: Fonts?.Bold,
                  },
                }}
              />
            </View>

            <AppButton
              borderRadius={10}
              fontSize={14}
              fontColor={Colors.WHITE}
              fontFamily={Fonts.semiBold}
              height={40}
              value={"VERIFY OTP"}
              style={{ marginTop: 40 }}
              alignSelf={"center"}
              width={"90%"}
              onPress={() => {
                VerifyapiCall();
              }}
            />
            <View style={{ alignSelf: "center", marginTop: 20 }}>
              <TouchableOpacity>
                <AppText textType="semiBold12" style={style.logindesTxt}>
                  Didn't receive any OTP ?{" "}
                  <AppText textType="semiBold12" style={style.linkTxt}>
                    Resend OTP
                  </AppText>
                </AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
export default VerifyOTP;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    bottomContentView: {
      flex: 2,
      backgroundColor: theme.background,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      maxWidth: 600,
      alignSelf: "center",
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
    logindesTxt: {
      color: Colors.LIGHTGREY,
      marginHorizontal: 5,
    },
    linkTxt: {
      color: theme.text,
      textDecorationLine: "underline",
      textDecorationColor: theme.text,
    },
  });
