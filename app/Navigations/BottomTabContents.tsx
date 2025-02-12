import React, { useContext, memo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Icon from "../Global/Components/AppIcons";
import themeContext from "../Global/Theme/themeContext";
import { Colors } from "../Global/Theme/Colors";
import { Fonts } from "../assets/Fonts/Fonts";
import AppText from "../Global/Components/AppText";

const BottomTabContents = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const theme = useContext(themeContext);
  const style = styles(theme);
  return (
    <Pressable
      android_ripple={style.rippleStyle}
      style={[style.container, { flex: 1 }]}
      onPress={onPress}
    >
      <View style={[style.btn]}>
        <Icon
          type={item.type}
          name={item.icon}
          size={20}
          color={focused ? Colors.BLACK : Colors.LIGHTGREY}
        />

        <AppText
          textType="medium12"
          style={{
            color: focused ? Colors.BLACK : Colors.LIGHTGREY,
          }}
        >
          {item.label}
        </AppText>
      </View>
    </Pressable>
  );
};

export default memo(BottomTabContents);
const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    btn: {
      alignItems: "center",
      borderRadius: 16,
    },
    rippleStyle: {
      color: Colors.WHITE,
    },
    label: {
      fontSize: 12,
      fontFamily: Fonts.Medium,
    },
  });
