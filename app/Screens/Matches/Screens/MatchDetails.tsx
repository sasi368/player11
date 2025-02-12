import React, { useContext } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Colors } from "../../../Global/Theme/Colors";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedPlayerList } from "../../../Redux/Actions/MatchAction";
import AppText from "../../../Global/Components/AppText";
import { MatchDetailsTab } from "./MatchDetailsTab";

const MatchDetails = (props: any) => {
  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const dispatch = useDispatch();

  // Redux
  const selectedMatchDetails = useSelector(
    (state: any) => state.selectedMatchDetailReducer.details
  );

  const _renderTopSection = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.BLACK,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 30,
                }}
              >
                <Icon
                  type={AppIcons.Ionicons}
                  name={"chevron-back"}
                  size={25}
                  color={Colors.WHITE}
                />
              </View>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10 }}>
              <AppText textType="bold12" style={{ color: Colors.WHITE }}>
                {selectedMatchDetails?.team1?.teamSymbol} vs{" "}
                {selectedMatchDetails?.team2?.teamSymbol}
              </AppText>

              <AppText textType="bold12" style={{ color: Colors.LIGHTGREY }}>
                {selectedMatchDetails?.status}
              </AppText>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Payment");
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.PRIMARY,
                  flexDirection: "row",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <AppText textType="bold16" style={{ color: Colors.BLACK }}>
                  ₹100
                </AppText>

                <Icon
                  type={AppIcons.MaterialCommunityIcons}
                  name={"wallet-plus"}
                  size={20}
                  color={Colors.BLACK}
                  style={{ marginHorizontal: 5 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 15 }} />
      </View>
    );
  };

  const _renderCreateTeamBtn = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(addSelectedPlayerList([]));
          props.navigation.navigate("CreateTeam");
        }}
      >
        <View style={style.createTeamBtnContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              type={AppIcons.AntDesign}
              name={"addusergroup"}
              size={20}
              color={theme.background}
            />

            <AppText
              textType="bold10"
              style={{ color: theme.background, marginHorizontal: 5 }}
            >
              CREATE TEAM
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        translucent={false}
        barStyle={"light-content"}
        backgroundColor={Colors.BLACK}
      />

      {_renderTopSection()}

      {MatchDetailsTab()}

      {_renderCreateTeamBtn()}
    </SafeAreaView>
  );
};
export default MatchDetails;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.cardBackground,
    },
    carouselContainer: {
      marginBottom: 20,
    },
    createTeamBtnContainer: {
      position: "absolute",
      bottom: 20, // You can adjust the bottom value as needed
      backgroundColor: theme.text,
      borderRadius: 20,
      alignItems: "center",
      alignSelf: "center",
      paddingVertical: 10,
      paddingHorizontal: 15,
      right: 20,
    },
  });
