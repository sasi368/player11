import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Colors } from "../../../Global/Theme/Colors";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { Images } from "../../../assets/Images/Images";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import isEmpty from "../../../Global/Helper/isEmpty";
import { windowWidth } from "../../../Global/Theme/GlobalStyles";
import AppText from "../../../Global/Components/AppText";
import useDimensions from "../../../Global/Theme/useDimensions";
import { getMatchPlayers } from "../ApiActions";
import PlayerSkeletonLoader from "../Components/PlayerSkeletonLoader";
import { CreateTeamTab } from "./CreateTeamTab";
import { displayToast } from "../../../Global/Components/Toast";
import { checker } from "../../../Global/Helper/helperFunc";
import { Config } from "../../../api/Config";

const CreateTeam = (props: any) => {
  const { width } = useDimensions();
  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const [datas, setDatas] = useState({
    playerList: [],
    venueDetails: {},
  });
  const selectedMatchDetails = useSelector(
    (state: any) => state.selectedMatchDetailReducer.details
  );

  const selectedPlayerList = useSelector(
    (state: any) => state.selectedPlayerListReducer.details
  );

  const rolesAvailable = [
    ...new Set(
      datas?.playerList?.flatMap((item: any) =>
        item?.players
          .filter((item2: any) => !item2?.isSupportStaff) // Exclude support staff roles
          .map((item2: any) => item2.role)
      )
    ),
  ];

  const roleSelected = selectedPlayerList?.map((item: any, index: any) => {
    return item.role;
  });

  const isNextVisible =
    !isEmpty(selectedPlayerList) && selectedPlayerList?.length == 11
      ? true
      : false;

  useEffect(() => {
    if (!isEmpty(selectedMatchDetails?.matchId)) {
      getPlayers();
    }
  }, [selectedMatchDetails]);

  const getPlayers = async () => {
    try {
      let params = {
        matchId: selectedMatchDetails?.matchId,
      };
      const { data } = await getMatchPlayers(params);
      setDatas((prevState) => ({
        ...prevState,
        ["playerList"]: data?.teamDetails,
        ["venueDetails"]: data?.venueDetails,
      }));
    } catch (e) {
      console.log(e, "getPlayers err from createTeam");
    }
  };

  const goNext = () => {
    if (checker(roleSelected, rolesAvailable)) {
      props.navigation.navigate("ConfirmTeam");
    } else {
      displayToast("Please select at least one player for each role");
    }
  };

  const _renderTopSection = () => {
    const FirstTeamImg = `${Config.BASE_URL}${selectedMatchDetails?.team1?.teamImage}`;
    const secondTeamImg = `${Config.BASE_URL}${selectedMatchDetails?.team2?.teamImage}`;
    return (
      <>
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
                <AppText
                  textType="bold12"
                  style={{
                    color: Colors.WHITE,
                  }}
                >
                  Create Team
                </AppText>

                <AppText
                  textType="bold12"
                  style={{
                    color: Colors.LIGHTGREY,
                  }}
                >
                  {selectedMatchDetails?.status}
                </AppText>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <View
                  style={{
                    height: 20,
                    width: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 35,
                    marginHorizontal: 5,
                  }}
                >
                  <Icon
                    type={AppIcons.AntDesign}
                    name={"questioncircleo"}
                    size={20}
                    color={Colors.WHITE}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 15 }} />
        </View>

        <View
          style={{
            backgroundColor: Colors.BLACK,
          }}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
            <View
              style={{
                flex: 0.3,
              }}
            >
              <AppText
                textType="semiBold12"
                style={{
                  color: Colors.WHITE,
                }}
              >
                Players
              </AppText>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AppText
                  textType="bold16"
                  style={{
                    color: Colors.WHITE,
                  }}
                >
                  {selectedPlayerList?.length ?? 0}/
                </AppText>

                <AppText
                  textType="medium12"
                  style={{
                    color: Colors.WHITE,
                  }}
                >
                  11
                </AppText>
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: FirstTeamImg }}
                  style={{ width: 45, height: 45, borderRadius: 40 }}
                  resizeMode="contain"
                />
                <View>
                  <AppText
                    textType="semiBold12"
                    style={{
                      color: Colors.WHITE,
                    }}
                  >
                    {selectedMatchDetails?.team1?.teamSymbol}
                  </AppText>

                  <AppText
                    textType="bold16"
                    style={{
                      color: Colors.WHITE,
                      textAlign: "center",
                    }}
                  >
                    0
                  </AppText>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  <AppText
                    textType="semiBold12"
                    style={{
                      color: Colors.WHITE,
                    }}
                  >
                    {selectedMatchDetails?.team2?.teamSymbol}
                  </AppText>

                  <AppText
                    textType="bold16"
                    style={{
                      color: Colors.WHITE,
                      textAlign: "center",
                    }}
                  >
                    0
                  </AppText>
                </View>
                <Image
                  source={{ uri: secondTeamImg }}
                  style={{ width: 45, height: 45, borderRadius: 40 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                alignItems: "flex-end",
              }}
            >
              <AppText
                textType="semiBold12"
                style={{
                  color: Colors.WHITE,
                }}
              >
                Credits Left
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
          </View>
          <View style={{ marginTop: 15 }} />
          <View style={{ alignSelf: "center" }}>
            <Progress.Bar
              progress={
                !isEmpty(selectedPlayerList?.length)
                  ? selectedPlayerList?.length / 11
                  : 0
              }
              height={5}
              width={width >= 1100 ? width * 0.98 : windowWidth * 0.93}
              color={Colors.PRIMARY}
              unfilledColor={"#c2d9dd"}
              borderColor={"#c2d9dd"}
            />
          </View>

          <AppText
            textType="bold12"
            style={{
              color: Colors.LIGHTGREY,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            T20 Match
          </AppText>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <AppText
              textType="bold12"
              style={{
                color: Colors.LIGHTGREY,
                textAlign: "center",
              }}
            >
              Country: {datas?.venueDetails?.country}
            </AppText>

            <AppText
              textType="bold12"
              style={{
                color: Colors.LIGHTGREY,
                textAlign: "center",
              }}
            >
              City: {datas?.venueDetails?.city}
            </AppText>

            <AppText
              textType="bold12"
              style={{
                color: Colors.LIGHTGREY,
                textAlign: "center",
              }}
            >
              Ground: {datas?.venueDetails?.ground}
            </AppText>
          </View>
          <View style={{ marginTop: 15 }} />
        </View>
      </>
    );
  };

  const _previewTeamBtn = () => {
    return (
      <View
        style={[
          style.previewBtnView,
          { paddingHorizontal: width >= 1100 ? 50 : 15 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("PreviewTeam");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              type={AppIcons.AntDesign}
              name={"eyeo"}
              size={20}
              color={Colors.WHITE}
            />

            <AppText
              textType="bold10"
              style={{
                color: Colors.WHITE,
                marginHorizontal: 5,
              }}
            >
              PREVIEW
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const _proceedNextBtn = () => {
    return (
      <TouchableOpacity
        disabled={isNextVisible ? false : true}
        onPress={() => {
          goNext();
        }}
      >
        <View
          style={[
            style.nextBtnView,
            {
              backgroundColor: isNextVisible
                ? theme.text
                : theme.cardBackground,
              paddingHorizontal: width >= 1100 ? 50 : 20,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              textType="bold10"
              style={{
                color: isNextVisible ? theme.background : "grey",
                marginHorizontal: 5,
              }}
            >
              NEXT
            </AppText>

            <Icon
              type={AppIcons.MaterialIcons}
              name={"navigate-next"}
              size={20}
              color={isNextVisible ? theme.background : "grey"}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{ flex: 1 }}>
        {_renderTopSection()}

        {isEmpty(datas?.playerList) ? (
          <View style={{ flex: 1 }}>
            <PlayerSkeletonLoader />
          </View>
        ) : (
          <CreateTeamTab
            playerLists={datas?.playerList}
            rolesAvailable={rolesAvailable}
          />
        )}

        {_previewTeamBtn()}

        {_proceedNextBtn()}
      </View>
    </SafeAreaView>
  );
};
export default CreateTeam;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    previewBtnView: {
      position: "absolute",
      bottom: 20,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 20,
      alignItems: "center",
      alignSelf: "center",
      paddingVertical: 10,
      left: 10,
    },
    nextBtnView: {
      position: "absolute",
      bottom: 20,
      borderRadius: 20,
      alignItems: "center",
      alignSelf: "center",
      paddingVertical: 10,
      right: 10,
    },
  });
