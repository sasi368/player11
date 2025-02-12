import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Images } from "../../../assets/Images/Images";
import { Colors } from "../../../Global/Theme/Colors";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../../../Global/Components/AppLoader";
import AppText from "../../../Global/Components/AppText";
import useDimensions from "../../../Global/Theme/useDimensions";
import { addSelectedPlayerList } from "../../../Redux/Actions/MatchAction";
import { createTeam } from "../ApiActions";
import { displayToast } from "../../../Global/Components/Toast";
import isEmpty from "../../../Global/Helper/isEmpty";

const ConfirmTeam = (props: any) => {
  const { width } = useDimensions();

  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const selectedMatchDetails = useSelector(
    (state: any) => state.selectedMatchDetailReducer.details
  );

  const selectedPlayerList = useSelector(
    (state: any) => state.selectedPlayerListReducer.details
  );

  const setCapViceCap = async (
    item: any,
    isCap?: boolean,
    isWiseCap?: boolean
  ) => {
    const updatedPlayerList = selectedPlayerList?.map(
      (item2: any, index2: any) => {
        if (item?.playerId == item2?.playerId) {
          item2.isCap = isCap;
          item2.isWiseCap = isWiseCap;
        }

        return item2;
      }
    );
    dispatch(addSelectedPlayerList(updatedPlayerList));
  };

  const SaveTeamPlayer = async () => {
    setLoader(true);
    try {
      let params = {
        userId: global.userData?.user?._id,
        matchId: selectedMatchDetails?.matchId,
        selectedPlayers: selectedPlayerList,
      };

      const { data, msg } = await createTeam(params);
      setLoader(false);

      if (!isEmpty(msg)) {
        displayToast(msg);
        props.navigation.navigate("MatchDetails");
      }
    } catch (e) {
      console.log(e, "SaveTeamPlayer err");
      setLoader(false);
    }
  };

  const renderPlayersDetails = ({ item, index }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          width: width >= 1100 ? width * 0.65 : width * 0.95,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flex: 1.1,
            alignSelf: "flex-start",
          }}
        >
          <Image
            source={Images.applogo}
            style={{
              height: 55,
              width: 55,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ flex: 2.6 }}>
          <View>
            <AppText textType="semiBold12" style={{ color: theme.text }}>
              {item?.playerName}
            </AppText>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppText
                textType="semiBold12"
                style={{ color: Colors.LIGHTGREY }}
              >
                513 Points
              </AppText>
            </View>

            <AppText textType="semiBold12" style={{ color: Colors.PRIMARY }}>
              Played Last Match
            </AppText>
          </View>
        </View>

        <View
          style={{
            flex: 1.2,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("c clicked");
              setCapViceCap(item, true, false);
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                backgroundColor: item?.isCap
                  ? Colors.PRIMARY
                  : theme.background,
              }}
            >
              <AppText
                textType="medium14"
                style={{ color: item?.isCap ? Colors.WHITE : theme.text }}
              >
                C
              </AppText>
            </View>
          </TouchableOpacity>

          <AppText
            textType="medium12"
            style={{ color: theme.text, marginTop: 3 }}
          >
            24.63%
          </AppText>
        </View>

        <View style={{ flex: 1.2, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              console.log("VC clicked");
              setCapViceCap(item, false, true);
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                backgroundColor: item?.isWiseCap ? Colors.PRIMARY : theme.text,
              }}
            >
              <AppText
                textType="medium12"
                style={{
                  color: item?.isWiseCap ? Colors.WHITE : theme.background,
                }}
              >
                VC
              </AppText>
            </View>
          </TouchableOpacity>

          <AppText
            textType="medium12"
            style={{ color: theme.text, marginTop: 3 }}
          >
            24.63%
          </AppText>
        </View>
      </View>
    );
  };

  const renderFooter = () => (
    <View style={{ height: 100, backgroundColor: theme.cardBackground }} />
  );
  return (
    <SafeAreaView style={style.container}>
      <AppLoader loading={loader} />
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
                style={{ color: Colors.WHITE, marginTop: 3 }}
              >
                Create Team
              </AppText>

              <AppText textType="bold12" style={{ color: Colors.LIGHTGREY }}>
                44m 05s left
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
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <AppText textType="semiBold14" style={{ color: theme.text }}>
          Select your team Captain and Vice Captain
        </AppText>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          width: width >= 1100 ? width * 0.65 : width * 0.95,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flex: 1.7,
            alignSelf: "flex-start",
          }}
        >
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText textType="medium12" style={{ color: Colors.LIGHTGREY }}>
                SELECTED BY
              </AppText>

              <Icon
                type={AppIcons.AntDesign}
                name={"swap"}
                size={15}
                style={{ transform: [{ rotate: "90deg" }] }}
                color={Colors.LIGHTGREY}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2.0, alignItems: "flex-end" }}>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText
                textType="medium12"
                style={{ color: Colors.LIGHTGREY, alignSelf: "flex-end" }}
              >
                %C BY
              </AppText>
              <Icon
                type={AppIcons.AntDesign}
                name={"swap"}
                size={15}
                style={{ transform: [{ rotate: "90deg" }] }}
                color={Colors.LIGHTGREY}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1.2, alignItems: "flex-end" }}>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText
                textType="medium12"
                style={{ color: Colors.LIGHTGREY, alignSelf: "flex-end" }}
              >
                %VC BY
              </AppText>

              <Icon
                type={AppIcons.AntDesign}
                name={"swap"}
                size={15}
                style={{ transform: [{ rotate: "90deg" }] }}
                color={Colors.LIGHTGREY}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 5 }} />

      <FlatList
        data={selectedPlayerList}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayersDetails}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("PreviewTeam");
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 20, // You can adjust the bottom value as needed
            backgroundColor: Colors.PRIMARY,
            borderRadius: 20,
            alignItems: "center",
            alignSelf: "center",
            paddingVertical: 10,
            paddingHorizontal: width >= 1100 ? 50 : 15,
            left: 10,
          }}
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
                style={{ marginHorizontal: 5, color: Colors.WHITE }}
              >
                PREVIEW
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          SaveTeamPlayer();
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 20, // You can adjust the bottom value as needed
            backgroundColor: Colors.GREEN,
            borderRadius: 20,
            alignItems: "center",
            alignSelf: "center",
            paddingVertical: 10,
            paddingHorizontal: width >= 1100 ? 50 : 20,
            right: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              textType="bold10"
              style={{ marginHorizontal: 5, color: Colors.BLACK }}
            >
              SAVE
            </AppText>

            <Icon
              type={AppIcons.AntDesign}
              name={"checkcircleo"}
              size={20}
              color={Colors.BLACK}
            />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ConfirmTeam;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.cardBackground,
    },
  });
