import React, { useContext } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Images } from "../../../assets/Images/Images";
import { Colors } from "../../../Global/Theme/Colors";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { addSelectedPlayerList } from "../../../Redux/Actions/MatchAction";
import AppText from "../../../Global/Components/AppText";
import useDimensions from "../../../Global/Theme/useDimensions";

const UserTeamList = (props: any) => {
  const { width } = useDimensions();
  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const dispatch = useDispatch();
  const { teamList } = props;

  const renderItem = ({ item, index }: any) => {
    const isCapPlayers = item?.selectedPlayers?.filter(
      (item2: any, index2: any) => {
        return item2?.isCap != undefined;
      }
    );

    const roleCount = {};

    item?.selectedPlayers?.forEach((player) => {
      roleCount[player.role] = (roleCount[player.role] || 0) + 1;
    });
    const roleArray = Object.keys(roleCount).map((key) => ({
      label: key,
      value: roleCount[key],
    }));

    return (
      <View
        style={{
          flex: 1,
          marginTop: 15,
          width: width >= 1100 ? width * 0.6 : width * 0.95,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            dispatch(addSelectedPlayerList(item?.selectedPlayers));
            props.navigation.navigate("PreviewTeam");
          }}
        >
          <ImageBackground
            source={Images.myteamBg}
            resizeMode="cover"
            imageStyle={{ borderRadius: 10 }}
          >
            {/* Top Content */}
            <LinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 0.5, y: 1.0 }}
              angle={135}
              style={{ borderRadius: 10 }}
              colors={
                theme.theme == "dark"
                  ? [theme.cardBackground, theme.cardBackground]
                  : ["#5ab53d", "#418F3C"] //"#FFF3DC", "#fff4df", "#fff6e6", "#fff9ed", "#fffaf1"
              }
            >
              <View
                style={{
                  margin: 8,
                  marginHorizontal: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* Right Content */}
                <View style={{ width: "25%" }}>
                  <AppText
                    textType="semiBold12"
                    style={{
                      color: Colors.WHITE,
                    }}
                  >
                    Team ({index + 1})
                  </AppText>
                </View>
                {/* Left Content */}
                <View
                  style={{
                    width: "60%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={() => {}}>
                    <Icon
                      type={AppIcons.AntDesign}
                      name={"edit"}
                      size={20}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      type={AppIcons.Ionicons}
                      name={"swap-vertical-outline"}
                      size={20}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      type={AppIcons.AntDesign}
                      name={"copy1"}
                      size={20}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      type={AppIcons.AntDesign}
                      name={"sharealt"}
                      size={20}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            {/* Secound Row */}

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <AppText
                  textType="medium14"
                  style={{
                    color: Colors.WHITE,
                  }}
                >
                  {"Points"}
                </AppText>

                <AppText
                  textType="bold16"
                  style={{
                    color: Colors.WHITE,
                  }}
                >
                  100
                </AppText>
              </View>

              {isCapPlayers?.map((capItem: any, capIndex: any) => {
                return (
                  <View style={{ flex: 1, alignSelf: "center" }}>
                    <View
                      style={{
                        backgroundColor: Colors.WHITE,
                        borderRadius: 20,
                        width: 20,
                        height: 20,
                        alignSelf: "center",
                        justifyContent: "center",
                        left: -15,
                        top: 5,
                      }}
                    >
                      <AppText
                        textType="bold12"
                        style={{
                          color: Colors.BLACK,
                          textAlign: "center",
                        }}
                      >
                        {capItem?.isCap ? "C" : "VC"}
                      </AppText>
                    </View>
                    <Image
                      source={Images.profile}
                      style={{
                        height: 40,
                        width: 40,
                        resizeMode: "contain",
                        alignSelf: "center",
                      }}
                    />

                    <View
                      style={{
                        backgroundColor: Colors.WHITE,
                        borderRadius: 10,
                        padding: 5,
                        alignSelf: "center",
                      }}
                    >
                      <AppText
                        textType="medium12"
                        style={{
                          color: Colors.BLACK,
                          textAlign: "center",
                        }}
                      >
                        {capItem?.playerName}
                      </AppText>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Third Row */}

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              {roleArray?.map((roleItem, roleIndex) => {
                return (
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <AppText
                        textType="semiBold12"
                        style={{
                          color: Colors.WHITE,
                        }}
                      >
                        {roleItem?.label}
                      </AppText>

                      <AppText
                        textType="semiBold12"
                        style={{
                          color: Colors.WHITE,
                        }}
                      >
                        {" "}
                        {roleItem?.value}
                      </AppText>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={{ marginTop: 10 }} />
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = ({ item }: any) => (
    // Render an empty space at the end of the FlatList
    <View
      key={item?._id}
      style={{ height: 100, backgroundColor: theme.background }}
    />
  );

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={teamList}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
export default UserTeamList;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
