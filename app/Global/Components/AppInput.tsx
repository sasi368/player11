"use strict";
import React, { useContext, useState } from "react";
import {
  Animated,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { Colors } from "../Theme/Colors";
import themeContext from "../Theme/themeContext";
import isEmpty from "../Helper/isEmpty";
import { Fonts } from "../../assets/Fonts/Fonts";
import Icon, { AppIcons } from "./AppIcons";
import CountryCodePicker from "./CountryCodePicker";
import AppText from "./AppText";
import useDimensions from "../Theme/useDimensions";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AppInput = (props: any) => {
  const dimensions = useDimensions();
  const theme = useContext(themeContext);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeIcon, setEyeIcon] = useState("visibility-off");

  const paddingLeftSize = props.leftIcon ? 60 : props.countryPicker ? 100 : 10;
  const paddingRightSize = props.rightIcon
    ? 40
    : props.rightText
    ? 40
    : props.rightText2
    ? 70
    : 10;

  return (
    <View>
      <TextInput
        style={[
          {
            width: props.width ? props.width : "100%",
            borderRadius: props.borderRadius,
            borderWidth: props.borderWidth ? props.borderWidth : 0.7,
            paddingLeft: paddingLeftSize,
            paddingRight: paddingRightSize,
            marginVertical: props.marginVertical ? props.marginVertical : 10,
            borderColor: props.borderColor ? props.borderColor : Colors.GREY,
            height: props.height ? props.height : 45,
            alignItems: props.alignItems ? props.alignItems : "center",
            justifyContent: props.justifyContent
              ? props.justifyContent
              : "center",
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : theme.background,
            color: theme.text,
            fontSize: props.fontSize ? props.fontSize : 16,
            fontWeight: props.fontWeight,
            fontFamily: props.fontFamily ? props.fontFamily : Fonts.semiBold,
            alignSelf: props.alignSelf,
            textAlignVertical: props.textAlignVertical,
          },
          props.style,
        ]}
        ref={props.ref}
        value={!isEmpty(props.value) ? props.value : ""}
        autoCapitalize={"none"}
        editable={props.editable}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        multiline={props.isMultiLine ? props.isMultiLine : false}
        numberOfLines={props.numberOfLines}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={props.onChangeText}
        selectionColor={Colors.GREY}
        autoFocus={props.autoFocus}
        selectTextOnFocus={props.selectTextOnFocus}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        secureTextEntry={props.isPassword && !eyeOpen ? true : false}
      />
      {props?.error && (
        <AppText
          textType="regular12"
          style={{
            display: props.error ? "flex" : "none",
            color: Colors.RED,
            marginHorizontal: 20,
          }}
        >
          {props?.error}
        </AppText>
      )}

      {props.rightText ? (
        <TouchableOpacity
          onPress={props.rightTextonPress}
          style={{ position: "absolute", top: 25, right: 30 }}
        >
          <AppText
            textType="regular14"
            style={{
              color: theme.text,
            }}
          >
            {props.rightText}
          </AppText>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {props.rightText2 ? (
        <TouchableOpacity
          onPress={props.rightText2onPress}
          style={{
            borderWidth: 0.3,
            borderColor: Colors.GREY,
            paddingHorizontal: 13,
            paddingVertical: 3,
            borderRadius: 5,
            position: "absolute",
            top: 22,
            right: props.rightText ? 75 : 30,
          }}
        >
          <AppText
            textType="semiBold14"
            style={{
              color: Colors.GREY,
            }}
          >
            {props.rightText2}
          </AppText>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {props.leftText ? (
        <AppText
          textType="regular14"
          style={{
            position: "absolute",
            top: 25,
            left: 30,
            color: theme.text,
          }}
        >
          {props.leftText}
        </AppText>
      ) : (
        <View />
      )}

      {props.leftIcon ? (
        <TouchableOpacity
          onPress={props.leftIconPress}
          style={{
            position: "absolute",
            top: 20,
            left: 30,
          }}
        >
          <Icon
            type={AppIcons.AntDesign}
            name={props.leftIcon}
            size={25}
            color={Colors.LIGHTGREY}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {props.countryPicker ? (
        <TouchableOpacity
          onPress={() => {}}
          style={{
            position: "absolute",
            top: 20,
            left: 30,
          }}
        >
          <CountryCodePicker
            setCountryCode={props?.handleOnchange}
            isCodeVisible={true}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {props.rightIcon ? (
        <TouchableOpacity
          onPress={props.rightIconPress}
          style={{
            position: "absolute",
            top: 20,
            right: 30,
          }}
        >
          <Image
            source={props.iconName}
            style={[
              {
                width: 35,
                height: 35,
                borderRadius: 5,
              },
            ]}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {props.isPassword ? (
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 25,
            right: 30,
          }}
          onPress={() => {
            if (eyeOpen) {
              setEyeIcon("visibility-off");
              setEyeOpen(false);
            } else {
              setEyeIcon("visibility");
              setEyeOpen(true);
            }
          }}
        >
          <AnimatedIcon
            color={Colors.GREY}
            size={24}
            type={"MaterialIcons"}
            name={eyeIcon}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default AppInput;
