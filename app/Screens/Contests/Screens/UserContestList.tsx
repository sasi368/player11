import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "../../../Global/Helper/isEmpty";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { Fonts } from "../../../assets/Fonts/Fonts";
import { Colors } from "../../../Global/Theme/Colors";
import * as Progress from "react-native-progress";
import AppButton from "../../../Global/Components/AppButton";
import { handleToast, nFormatter } from "../../../Global/Helper/helperFunc";
import { windowWidth } from "../../../Global/Theme/GlobalStyles";
import { Images } from "../../../assets/Images/Images";
import RBSheet from "react-native-raw-bottom-sheet";
import { windowHeight } from "../../../Global/Helper/InputHandler";
import LinearGradient from "react-native-linear-gradient";
import { addSelectedPlayerList } from "../../../Redux/Actions/MatchAction";
import CheckBox from "react-native-check-box";
import useDimensions from "../../../Global/Theme/useDimensions";
import AppText from "../../../Global/Components/AppText";

const UserContestList = (props: any) => {
  const { width } = useDimensions();

  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const refConfirmRBSheet = useRef();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [TeamId, setTeamId] = useState("");
  const { contestList } = props;

  const renderAllContests = ({ item }: any) => {
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
              Max Price Pool
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
                    marginTop: 10,
                  }}
                >
                  {nFormatter(item?.contest?.maxPriceAmt)}
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
                      {"₹ 1000"}
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
                  value={"₹" + item?.contest?.entryFee}
                  width={width >= 1100 ? width * 0.1 : width * 0.26}
                  alignSelf={"flex-end"}
                  onPress={() => {}}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ alignSelf: "center" }}>
                <Progress.Bar
                  progress={
                    item?.contest?.spotsBooked / item?.contest?.maxEntry
                  }
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
                  {item?.contest?.spotsBooked} spots left
                </AppText>

                <AppText
                  textType="semiBold10"
                  style={{
                    color: Colors.LIGHTGREY,
                  }}
                >
                  {item?.contest?.maxEntry} spots
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
                  Upto {item?.contest?.totalSpots}
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
                    {nFormatter(item?.contest?.maxPriceAmt)}
                  </AppText>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }} />
          </View>

          {!isEmpty(item?.teams) && (
            <View
              style={{
                width: width * 0.9,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}
            >
              <AppText
                textType="bold12"
                style={{
                  color: theme.text,
                }}
              >
                Joined with team
              </AppText>
            </View>
          )}
          {item?.teams &&
            item?.teams?.map((teams, index) => {
              return (
                <View style={{ width: "100%", paddingHorizontal: 10 }}>
                  <AppText
                    textType="semiBold10"
                    style={{
                      color: theme.text,
                      marginVertical: 10,
                      padding: 5,
                      backgroundColor: theme.cardBackground,
                      alignSelf: "flex-start",
                    }}
                  >
                    {`T${index + 1}`}
                  </AppText>

                  <View
                    style={{
                      width: "100%",
                      padding: 4,
                      paddingHorizontal: 15,
                      borderRadius: 10,
                      marginBottom: 15,
                      backgroundColor: Colors.BLACK,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <AppText
                        textType="semiBold12"
                        style={{
                          color: theme.background,
                        }}
                      >
                        Team {index + 1}
                      </AppText>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Icon
                          onPress={() => {}}
                          type={AppIcons.FontAwesome}
                          name={"pencil"}
                          size={20}
                          color={Colors.GREY}
                        />
                        <View style={{ width: 10 }} />
                        <TouchableOpacity onPress={() => {}}>
                          <Icon
                            type={AppIcons.Entypo}
                            name={"swap"}
                            size={20}
                            color={Colors.TextGrey}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingVertical: 5,
                        columnGap: 20,
                      }}
                    >
                      <View style={{}}>
                        <AppText
                          textType="semiBold10"
                          style={{
                            color: Colors.TextGrey,
                          }}
                        >
                          Captain
                        </AppText>

                        <View style={{ width: 10 }} />
                        <AppText
                          textType="semiBold10"
                          style={{
                            color: theme.background,
                            fontSize: 11,
                          }}
                        >
                          {
                            teams?.selectedPlayers?.find(
                              (cap: any) => cap?.isCap
                            )?.playerName
                          }
                        </AppText>
                      </View>
                      <View style={{}}>
                        <AppText
                          textType="semiBold10"
                          style={{
                            color: Colors.TextGrey,
                          }}
                        >
                          Vise Captain
                        </AppText>

                        <View style={{ width: 10 }} />
                        <AppText
                          textType="semiBold10"
                          style={{
                            color: theme.background,
                            fontSize: 11,
                          }}
                        >
                          {
                            teams?.selectedPlayers?.find(
                              (cap: any) => cap?.isWiseCap
                            )?.playerName
                          }
                        </AppText>
                      </View>
                    </View>
                  </View>
                  <AppButton
                    borderRadius={5}
                    fontSize={12}
                    fontColor={theme.text}
                    fontFamily={Fonts.semiBold}
                    backgroundColor={"transparent"}
                    height={35}
                    value={`ADD TEAM ₹${item?.entryFee ?? "10"}`}
                    width={width >= 1100 ? width * 0.3 : width * 0.5}
                    alignSelf={"flex-end"}
                    onPress={() => {
                      // joinContest(item?._id);
                    }}
                    style={{
                      marginBottom: 10,
                      borderWidth: 1,
                      borderColor: Colors.TextGrey,
                    }}
                  />
                </View>
              );
            })}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  // render my remainning Team
  const renderItem = ({ item, index }: any) => {
    // console.log(item?.team_id,'item');
    return (
      <View
        style={{
          width: windowWidth * 0.95,
          marginHorizontal: windowWidth * 0.025,
          height: 200,
          paddingVertical: windowWidth * 0.025,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ flexDirection: "row", alignItems: "center", height: "100%" }}
          onPress={() => {
            setTeamId(item?.team_id);
            // dispatch(addSelectedPlayerList(item?.playerInfo));
            // props.navigation.navigate('PreviewTeam');
          }}
        >
          <ImageBackground
            style={{ width: windowWidth * 0.9, height: "100%" }}
            source={Images.myteamBg}
            resizeMode="cover"
            imageStyle={{ borderRadius: 10, width: "100%" }}
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
                {/* <View
                  style={{
                    width: '60%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('edit clicked', item?.playerInfo);
                      dispatch(addSelectedPlayerList(item?.playerInfo));
                      props?.navigation?.navigate('CreateTeam');
                    }}>
                    <Icon
                      type={AppIcons.AntDesign}
                      name={'edit'}
                      size={20}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      type={AppIcons.Ionicons}
                      name={'swap-vertical-outline'}
                      size={20}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      type={AppIcons.AntDesign}
                      name={'copy1'}
                      size={20}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      type={AppIcons.AntDesign}
                      name={'sharealt'}
                      size={20}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                </View> */}
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
              {item?.teamPlayercount?.map((teamItem, teamIndex) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <AppText
                      textType="medium12"
                      style={{
                        color: Colors.WHITE,
                      }}
                    >
                      {teamItem?.team}
                    </AppText>
                    <AppText
                      textType="bold16"
                      style={{
                        color: Colors.WHITE,
                      }}
                    >
                      {teamItem?.count}
                    </AppText>
                  </View>
                );
              })}

              {/* {console.log(item?.Cap_Players, 'item?.Cap_Players')} */}

              {item?.Cap_Players?.map((capItem, capIndex) => {
                return (
                  <View style={{ flex: 1, alignSelf: "center" }}>
                    <TouchableOpacity>
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
                          {capItem?.is_captain ? "C" : "VC"}
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
                          {capItem.Player_Name}
                        </AppText>
                      </View>
                    </TouchableOpacity>
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
              {item?.role?.map((roleItem, roleIndex) => {
                return (
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <AppText
                        textType="semiBold12"
                        style={{
                          color: Colors.WHITE,
                          textAlign: "center",
                        }}
                      >
                        {roleItem.roleDisplayName}
                      </AppText>
                      <AppText
                        textType="semiBold12"
                        style={{
                          color: Colors.WHITE,
                        }}
                      >
                        {" "}
                        {roleItem.count}
                      </AppText>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={{ marginTop: 10 }} />
          </ImageBackground>
          <CheckBox
            isChecked={item?.team_id == TeamId}
            onClick={() => {
              setTeamId(item?.team_id);
            }}
            checkBoxColor={
              item?.team_id == TeamId ? theme.text : Colors.LIGHTGREY
            }
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => (
    <View style={{ height: 100, backgroundColor: theme.background }} />
  );
  return (
    <SafeAreaView style={style.container}>
      {isEmpty(contestList) && !loader ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={Images.noMatches}
            style={{
              width: 100,
              height: 100,
              borderRadius: 40,
              opacity: 0.3,
              resizeMode: "contain",
            }}
            resizeMode="contain"
          />
          <AppText
            textType="semiBold12"
            style={{
              color: Colors.GREY,
              marginHorizontal: 10,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            {`You haven't joined a content yet!\nFind a contest to join and start winning`}
          </AppText>

          <AppButton
            borderRadius={5}
            fontSize={12}
            marginTop={20}
            fontColor={Colors.PRIMARY}
            fontFamily={Fonts.semiBold}
            backgroundColor={"transparent"}
            height={35}
            value={"JOIN A CONTEST"}
            width={"60%"}
            onPress={() => {
              props.navigation.navigate("All Contests");
            }}
          />
        </View>
      ) : (
        <FlatList
          data={contestList}
          renderItem={renderAllContests}
          ListFooterComponent={renderFooter}
          keyExtractor={(item, index) => item?.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      {/* <RBSheet
        ref={refConfirmRBSheet}
        onClose={() => {
          setTeamId("");
        }}
        closeOnPressMask={true}
        animationType="slide"
        customStyles={{
          container: {
            backgroundColor: theme.background,
            width: windowWidth,
            height: windowHeight * 0.5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: Colors.LIGHTGREY,
          },
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.background,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}
          >
            <TouchableOpacity
              style={{ flex: 0.12 }}
              activeOpacity={0.5}
              onPress={() => {
                refConfirmRBSheet.current.close();
                setTeamId("");
              }}
            >
              <Icon
                type={AppIcons.AntDesign}
                name={"close"}
                size={25}
                color={theme.text}
              />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 0.88,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Fonts.Bold,
                  color: theme.text,
                }}
              >
                CONFIRMATION
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.Medium,
                  color: Colors.LIGHTGREY,
                  marginTop: 5,
                }}
              >
                {`Select Team from Your Remaining Teams`}
              </Text>
            </View>
          </View>
          <View style={{ borderColor: Colors.LIGHTGREY, borderWidth: 0.25 }} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 15 }}
          >
            <View style={{}}>
              <FlatList
                horizontal
                pagingEnabled
                data={teamList.filter((itm: any) =>
                  myteamList.some((item) => itm?.team_id != item)
                )}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      width: "100%",
                      height: windowHeight * 0.3,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AppText>Please Create Team to Continue</AppText>
                  </View>
                )}
                keyExtractor={(item) => item?._id}
              />
            </View>
            <AppButton
              borderRadius={10}
              disabled={
                teamList.filter((itm: any) =>
                  myteamList.some((item) => itm?.team_id != item)
                ).length <= 0 || loading
              }
              fontSize={14}
              fontColor={Colors.WHITE}
              fontFamily={Fonts.semiBold}
              height={40}
              loading={loading}
              value={"JOIN CONTEST"}
              style={{ marginTop: 10 }}
              marginBottom={40}
              alignSelf={"center"}
              onPress={() => {}}
            />
          </ScrollView>
        </View>
      </RBSheet> */}
    </SafeAreaView>
  );
};
export default UserContestList;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
