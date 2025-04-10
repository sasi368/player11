import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Colors } from "../../../Global/Theme/Colors";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { Images } from "../../../assets/Images/Images";
import CustomImageCarousal from "../../../Global/Components/CustomImageCarousal";
import LinearGradient from "react-native-linear-gradient";
import { upcomingMatchListApi } from "../ApiActions";
import { Config } from "../../../api/Config";
import { SportsList, UpcomingList } from "../interfaces";
import { useDispatch } from "react-redux";
import { addSelectedMatchDetails } from "../../../Redux/Actions/MatchAction";
import moment from "moment";
import isEmpty from "../../../Global/Helper/isEmpty";
import AppText from "../../../Global/Components/AppText";
import useDimensions from "../../../Global/Theme/useDimensions";
import { displayToast } from "../../../Global/Components/Toast";
import {
  banners,
  sportsData,
  upcomingMatchesApiData,
} from "../../../api/DummyDataHome";
// import UpcomingSkeletonLoader from "../Components/UpcomingSkeletonLoader";

const UserMatches = (props: any) => {
  const { width } = useDimensions();
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 75], // Adjust the range as needed
    outputRange: [75, 0], // Initial height to collapsed height
    extrapolate: "clamp",
  });
  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const dispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [upcomingMatchList, setUpcomingMatchList] = useState([]);

  useEffect(() => {
    viewUpcomingMatches();
    // setUpcomingMatchList(upcomingMatchesApiData?.data);
  }, []);

  const viewUpcomingMatches = async () => {
    try {
      setLoader(true);
      const { data } = await upcomingMatchListApi();
      setLoader(false);
      setUpcomingMatchList(data);
    } catch (e) {
      setLoader(false);
      console.log(e, "viewUpcomingMatches err");
    }
  };

  const renderSports = ({ item, index }: SportsList) => {
    return (
      <View style={{ alignSelf: "flex-start", marginHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            if (index != 0) {
              displayToast("Coming Soon");
            }
          }}
        >
          <View
            style={{
              backgroundColor: index == 0 ? Colors.PRIMARY : "transparent",
              alignItems: "center",
              marginTop: 15,
              borderRadius: 10,
              padding: 8,
            }}
          >
            <Icon
              type={AppIcons.MaterialCommunityIcons}
              name={item.icon}
              size={20}
              color={index == 0 ? Colors.BLACK : Colors.LIGHTGREY}
            />

            <AppText
              textType="semiBold12"
              style={{
                color: index == 0 ? Colors.BLACK : Colors.LIGHTGREY,
              }}
            >
              {item.name}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderUpcomingMatches = ({ item, index }: UpcomingList) => {
    const linearColor =
      theme.theme == "dark"
        ? ["#1f263b", "#1f263b"]
        : ["#FFF3DC", "#fff4df", "#fff6e6", "#fff9ed", "#fffaf1"];
    const FirstTeamImg = `${Config.BASE_URL}${item?.team1?.teamImage}`;
    const secondTeamImg = `${Config.BASE_URL}${item?.team2?.teamImage}`;

    // Convert timestamp to moment object
    const convertDate = Number(item.matchStartDate);
    const dateTime = moment(convertDate);

    // Extract date and time separately
    const expiredDate = dateTime.format("YYYY-MM-DD"); // Output: 2025-02-13
    const expiredTime = dateTime.format("hh:mm:ss A"); // Output: 00:00:00

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate("MatchDetails");
          dispatch(addSelectedMatchDetails(item));
        }}
      >
        <View
          style={{
            alignSelf: "center",
            backgroundColor: theme.background,
            width: width >= 1100 ? width * 0.6 : width * 0.9,
            borderRadius: 15,
            marginTop: 15,
            elevation: 5,
            shadowColor: Colors.LIGHTGREY,
            bottom: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 10,
              marginHorizontal: 10,
            }}
          >
            <View style={{ flex: 2 }}>
              <AppText
                textType="bold12"
                style={{
                  color: theme.text,
                }}
              >
                {item?.matchName} {item?.matchDescription}
              </AppText>
            </View>

            <View style={{ flex: 1 }}>
              <AppText
                textType="bold12"
                style={{
                  color: Colors.GREEN,
                  textAlign: "right",
                }}
              >
                {item?.short_name}
              </AppText>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 0.3,
                // backgroundColor: 'green',
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: FirstTeamImg,
                }}
                style={{ width: 45, height: 45, borderRadius: 40 }}
                resizeMode="contain"
              />

              <AppText
                textType="bold12"
                style={{
                  color: theme.text,
                }}
              >
                {item?.team1?.teamSymbol}
              </AppText>
            </View>

            <View
              style={{
                flex: 0.5,
                // backgroundColor: 'red',
                alignItems: "center",
              }}
            >
              <AppText
                textType="bold12"
                style={{
                  color: theme.text,
                }}
              >
                {expiredDate}
              </AppText>

              <AppText
                textType="semiBold12"
                style={{
                  color: Colors.LIGHTGREY,
                }}
              >
                {expiredTime}
              </AppText>
            </View>

            <View
              style={{
                flex: 0.3,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <AppText
                textType="bold12"
                style={{
                  color: theme.text,
                }}
              >
                {item?.team2?.teamSymbol}
              </AppText>

              <Image
                source={{ uri: secondTeamImg }}
                style={{ width: 45, height: 45, borderRadius: 40 }}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <LinearGradient
              style={{
                flex: 0.8,
                borderTopRightRadius: 60,
                flexDirection: "row",
                alignItems: "flex-end",
              }}
              colors={linearColor}
            >
              <AppText
                textType="semiBold12"
                style={{
                  color: theme.text,
                  marginHorizontal: 10,
                  alignSelf: "center",
                }}
              >
                MEGA ₹3.5 Lakhs
              </AppText>
            </LinearGradient>
            <View
              style={{
                flex: 0.2,
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity>
                <View
                  style={{
                    height: 35,
                    width: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                  }}
                >
                  <Icon
                    type={AppIcons.Ionicons}
                    name={"notifications-outline"}
                    size={20}
                    color={theme.text}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        translucent={false}
        barStyle={"light-content"}
        backgroundColor={Colors.BLACK}
      />
      <View style={{ flex: 1 }}>
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
              marginHorizontal: 15,
              marginTop: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 35,
                }}
                onPress={() => {
                  props.navigation.openDrawer();
                }}
              >
                <Image
                  source={Images.applogo}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              <AppText
                textType="bold18"
                style={{
                  color: Colors.WHITE,
                  marginHorizontal: 10,
                }}
              >
                Player 11
              </AppText>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: 35,
                    width: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 35,
                    marginHorizontal: 15,
                  }}
                >
                  <Icon
                    type={AppIcons.Ionicons}
                    name={"notifications-outline"}
                    size={20}
                    color={Colors.WHITE}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Payment");
                }}
              >
                <View
                  style={{
                    height: 35,
                    width: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 35,
                    backgroundColor: Colors.PRIMARY,
                  }}
                >
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

          <Animated.View style={{ height: headerHeight, overflow: "hidden" }}>
            <FlatList
              data={sportsData}
              renderItem={renderSports}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </Animated.View>
          <View style={{ marginTop: 15 }} />
        </View>
        <View style={{ flex: 3 }}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          >
            <View style={{ marginTop: 5 }}>
              <CustomImageCarousal
                data={banners}
                autoPlay={true}
                pagination={true}
              />
            </View>

            {isEmpty(upcomingMatchList) && isLoader ? (
              <>
              {/* <UpcomingSkeletonLoader /> */}
              </>
            ) : (
              <View
                style={{
                  width: width >= 1100 ? width * 0.6 : width * 0.9,
                  alignSelf: "center",
                }}
              >
                <AppText
                  textType="bold16"
                  style={{
                    color: theme.text,
                    marginTop: 10,
                  }}
                >
                  Upcoming Matches
                </AppText>

                <FlatList
                  data={upcomingMatchList}
                  renderItem={renderUpcomingMatches}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>
            )}

            <View style={{ marginTop: 10 }} />
          </Animated.ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default UserMatches;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.cardBackground,
    },
    carouselContainer: {
      marginBottom: 20,
    },
  });
