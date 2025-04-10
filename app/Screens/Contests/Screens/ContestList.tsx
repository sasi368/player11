import React, { FC, useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Colors } from "../../../Global/Theme/Colors";
import AppButton from "../../../Global/Components/AppButton";

import * as Progress from "react-native-progress";

import LinearGradient from "react-native-linear-gradient";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { Fonts } from "../../../assets/Fonts/Fonts";
import isEmpty from "../../../Global/Helper/isEmpty";
import { nFormatter } from "../../../Global/Helper/helperFunc";
import AppText from "../../../Global/Components/AppText";
import useDimensions from "../../../Global/Theme/useDimensions";

import { joinContest } from "../ApiActions";
import AppLoader from "../../../Global/Components/AppLoader";
import { displayToast } from "../../../Global/Components/Toast";

const ContestList = (props: any) => {
  const { width } = useDimensions();
  const { contestList, teamList, refreshFunctions, isLoader } = props;
  const [processLoader, setProcessLoader] = useState(false);
  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);

  const joinContestApi = async (contestId) => {
    try {
      setProcessLoader(true);

      let params = {
        contestId: contestId,
        teamIds: [teamList[0]?._id],
        userId: global.userData?.user?._id,
      };

      const { status, data, msg } = await joinContest(params);

      displayToast(msg?.toString());
      refreshFunctions();

      setProcessLoader(false);
    } catch (e) {
      console.log(e, "joinContestApi err");
      setProcessLoader(false);
    }
  };

  // Functions
  const renderCategories = ({ item }: any) => {
    return (
      <>
        <LinearGradient
          style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            width: width >= 1100 ? width * 0.6 : width * 0.95,
            alignSelf: "center",
          }}
          colors={
            theme.theme == "dark" && theme?.cardBackground
              ? [theme?.cardBackground, theme?.cardBackground]
              : ["#FFF3DC", "#fff4df", "#fff6e6", "#fff9ed", "#fffaf1"]
          }
        >
          <View style={{ marginTop: 10 }} />
          <AppText
            textType="semiBold12"
            style={{ color: theme.text, marginHorizontal: 10 }}
          >
            {item.contestCategory}
          </AppText>

          <View style={{ marginTop: 10 }} />
        </LinearGradient>
        <FlatList
          data={item?.availableContests}
          renderItem={renderContests}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </>
    );
  };

  const renderContests = ({ item }: any) => {
    let amtToPay = item?.entryFee - item?.discountAmt;
    return (
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            backgroundColor: theme.background,
            borderRadius: 15,
            marginTop: 15,
            elevation: 5,
            alignSelf: "center",
            shadowColor: Colors.LIGHTGREY,
            width: width >= 1100 ? width * 0.6 : width * 0.9,
            bottom: 5,
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <AppText
              textType="bold12"
              style={{
                color: theme.text,
                marginTop: 10,
              }}
            >
              {item?.contestLabel}
            </AppText>

            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <View style={{ flex: 0.6 }}>
                <AppText
                  textType="bold18"
                  style={{
                    color: theme.text,
                  }}
                >
                  {nFormatter(item?.maxPriceAmt) ?? "₹ 1000"}
                </AppText>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: theme.cardBackground,
                      padding: 5,
                      alignItems: "center",
                    }}
                  >
                    <AppText
                      textType="semiBold10"
                      style={{
                        color: Colors.LIGHTGREY,
                      }}
                    >
                      1st Price:{" "}
                    </AppText>
                    <AppText
                      textType="semiBold12"
                      style={{
                        color: theme.text,
                      }}
                    >
                      static
                    </AppText>
                  </View>
                </View>
              </View>
              <View style={{ flex: 0.4 }}>
                <AppButton
                  borderRadius={5}
                  fontSize={14}
                  fontColor={Colors.WHITE}
                  fontFamily={Fonts.semiBold}
                  backgroundColor={Colors.GREEN}
                  height={35}
                  value={"₹" + amtToPay}
                  width={width >= 1100 ? width * 0.1 : width * 0.26}
                  alignSelf={"flex-end"}
                  onPress={() => {
                    joinContestApi(item?._id);
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ alignSelf: "center" }}>
                <Progress.Bar
                  progress={item?.spotsBooked / item?.maxEntry}
                  height={4}
                  width={width >= 1100 ? width * 0.6 : width * 0.9}
                  color={Colors.PRIMARY}
                  unfilledColor={"#c2d9dd"}
                  borderColor={"#c2d9dd"}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <AppText
                  textType="semiBold10"
                  style={{
                    color: Colors.LIGHTGREY,
                  }}
                >
                  {item?.totalSpots - item?.spotsBooked} spots left
                </AppText>

                <AppText
                  textType="semiBold10"
                  style={{
                    color: Colors.LIGHTGREY,
                  }}
                >
                  {item?.spotsBooked ?? "10"} spots
                </AppText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <AppText
                  textType="semiBold10"
                  style={{
                    color: Colors.GREY,
                  }}
                >
                  Upto {item?.totalSpots ?? "0..0"}
                </AppText>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    type={AppIcons.Entypo}
                    name={"trophy"}
                    size={20}
                    color={"#FFD700"}
                  />

                  <AppText
                    textType="semiBold10"
                    style={{
                      color: Colors.GREY,
                    }}
                  >
                    {"63%"}
                  </AppText>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderFooter = () => (
    <View style={{ height: 100, backgroundColor: theme.cardBackground }} />
  );

  return (
    <SafeAreaView style={style.container}>
      <AppLoader loading={processLoader} />

      {isLoader ? (
        <>{/* <ContestSkeletonLoader /> */}</>
      ) : isEmpty(contestList) ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppText
            textType="medium12"
            style={{
              color: Colors.LIGHTGREY,
            }}
          >
            No Record Found
          </AppText>
        </View>
      ) : (
        <FlatList
          data={contestList}
          renderItem={renderCategories}
          keyExtractor={(item) => item._id}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};
export default ContestList;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.cardBackground,
    },
  });
