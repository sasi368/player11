import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Images } from "../../../assets/Images/Images";
import AppInput from "../../../Global/Components/AppInput";
import { Colors } from "../../../Global/Theme/Colors";
import { onChangeValues } from "../../../Global/Helper/InputHandler";
import { Fonts } from "../../../assets/Fonts/Fonts";
import CheckBox from "react-native-check-box";
import AppButton from "../../../Global/Components/AppButton";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { LoginValues, LoginValueErrs } from "../Interfaces";
import isEmpty from "../../../Global/Helper/isEmpty";
import { displayToast } from "../../../Global/Components/Toast";
import { SignInApi } from "../ApiActions";
import { loginValidation } from "../Validations";
import AppLoader from "../../../Global/Components/AppLoader";
import { useDispatch } from "react-redux";
import { addLoginData } from "../../../Redux/Actions/LoginAction";
import AppText from "../../../Global/Components/AppText";

const initialInputsState: LoginValues = {
  mobile_no: "",
  country_code: "",
  checked: false,
};

const Login = (props: any) => {
  const theme = useContext(themeContext);
  const style = styles(theme);
  const translateY = useState(new Animated.Value(500))[0]; // Initial position off-screen

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<LoginValues>(initialInputsState);
  const [errors, setErrors] = useState<LoginValueErrs>({});
  const [isLoading, setLoading] = useState(false);

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

  const LoginApi = async () => {
    const { isValid } = await loginValidation(inputs, setErrors);

    if (isValid) {
      try {
        let params = {
          mobile_no: inputs?.mobile_no,
          country_code: !isEmpty(inputs?.country_code)
            ? inputs?.country_code
            : "",
        };
        setLoading(true);
        const { msg, data, status, apiErr } = await SignInApi(params);
        setLoading(false);
        if (!isEmpty(apiErr)) {
          setErrors(apiErr);
        } else {
          if (status) {
            displayToast(msg);
            let Userdata = {
              mobile_no: inputs?.mobile_no,
              country_code: !isEmpty(inputs?.country_code)
                ? inputs?.country_code
                : "",
              token: data?.token,
              userData: data,
            };
            dispatch(addLoginData(Userdata));

            props.navigation.navigate("VerifyOTP");
          } else if (!status) {
            displayToast("Something went wrong!");
          }
        }
      } catch (e) {
        console.log(e, "Login err");
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <AppLoader loading={isLoading} />
      <View style={{ flex: 1, backgroundColor: theme.text }}>
        <View style={{ flex: 0.35 }}>
          <View style={style.header}>
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
            <Icon
              type={AppIcons.MaterialIcons}
              name={"contact-support"}
              size={25}
              color={theme.background}
            />
          </View>
        </View>

        <Animated.View
          style={[
            style.bottomContentView,
            { transform: [{ translateY }] }, // Apply bottom-to-top animation
          ]}
        >
          <ScrollView>
            <Image source={Images.applogo} style={style.logo} />
            <AppText textType="bold18" style={style.loginTxt}>
              Get Started
            </AppText>
            <AppText textType="semiBold12" style={style.loginTxt2}>
              Enter your mobile number to continue your journey {"\n"}with us.
            </AppText>

            <View style={{ marginTop: 20 }} />
            <AppInput
              keyboardType="number-pad"
              backgroundColor={theme.cardBackground}
              fontColor={theme.text}
              fontSize={12}
              placeholderTextColor={Colors.LIGHTGREY}
              placeholder={"Mobile Number"}
              value={inputs?.mobile_no}
              onChangeText={(text: string) => handleOnchange(text, "mobile_no")}
              onFocus={() => {
                setErrors({ mobile_no: "" });
              }}
              error={errors?.mobile_no}
              style={{ borderColor: "transparent" }}
              borderRadius={8}
              alignSelf={"center"}
              height={50}
              countryPicker={true}
              handleOnchange={handleOnchange}
            />

            <View style={style.termsView}>
              <CheckBox
                isChecked={inputs?.checked}
                onClick={() => {
                  handleOnchange(!inputs?.checked, "checked");
                }}
                checkBoxColor={inputs?.checked ? theme.text : Colors.LIGHTGREY}
              />
              <AppText textType="semiBold12" style={style.logindesTxt}>
                I hereby confirm to be 18 years old & provide my acceptance to{" "}
                <AppText textType="semiBold12" style={style.linkTxt}>
                  Terms & Conditions
                </AppText>{" "}
                and{" "}
                <AppText textType="semiBold12" style={style.linkTxt}>
                  Privacy Policy
                </AppText>{" "}
                of Team11.
              </AppText>
            </View>

            <AppButton
              borderRadius={10}
              fontSize={14}
              fontColor={Colors.WHITE}
              fontFamily={Fonts.semiBold}
              height={40}
              value={"SEND OTP"}
              style={{ marginTop: 40 }}
              width={"90%"}
              alignSelf={"center"}
              onPress={() => {
                LoginApi();
              }}
            />
          </ScrollView>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
    header: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 15,
    },
    logo: {
      width: 120,
      height: 120,
      resizeMode: "contain",
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
    termsView: {
      flexDirection: "row",
      marginHorizontal: 15,
      marginTop: 15,
    },
    logindesTxt: {
      color: Colors.LIGHTGREY,
      width: "90%",
      marginHorizontal: 5,
    },
    linkTxt: {
      color: theme.text,
      textDecorationLine: "underline",
      textDecorationColor: Colors.PRIMARY,
    },
  });
