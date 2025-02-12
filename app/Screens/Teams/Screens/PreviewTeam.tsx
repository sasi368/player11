import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Images } from "../../../assets/Images/Images";
import { Fonts } from "../../../assets/Fonts/Fonts";
import { Colors } from "../../../Global/Theme/Colors";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import { useSelector } from "react-redux";
import AppButton from "../../../Global/Components/AppButton";
import { windowHeight } from "../../../Global/Helper/InputHandler";
import AppText from "../../../Global/Components/AppText";

const PreviewTeam = (props: any) => {
  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);

  const selectedMatchDetails = useSelector(
    (state: any) => state.selectedMatchDetailReducer.details
  );

  const selectedPlayerList = useSelector(
    (state: any) => state.selectedPlayerListReducer.details
  );

  const keepers = selectedPlayerList?.filter((obj: any) => {
    return obj?.role == "WK-Batsman";
  });

  const batsmans = selectedPlayerList?.filter((obj: any) => {
    return obj?.role == "Batsman";
  });

  const bowlers = selectedPlayerList?.filter((obj: any) => {
    return obj?.role == "Bowler";
  });

  const all_rounders = selectedPlayerList?.filter((obj: any) => {
    return obj?.role == "AllRounder";
  });

  const Items = (key: any, item: any) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            props.navigation.navigate("PlayersInfo");
          }}
        >
          <View style={{ position: "relative" }}>
            {(key.item?.isCap || key.item?.isWiseCap) && (
              <View
                style={{
                  backgroundColor: Colors.WHITE,
                  borderRadius: 20,
                  width: 20,
                  height: 20,
                  alignSelf: "center",
                  justifyContent: "center",
                  left: -15,
                  top: 15,
                }}
              >
                <AppText
                  textType="bold12"
                  style={{ color: Colors.BLACK, textAlign: "center" }}
                >
                  {key.item?.isCap ? "C" : "VC"}
                </AppText>
              </View>
            )}
            <Image
              source={Images.profile}
              style={{
                height: 40,
                width: 40,
                resizeMode: "contain",
                alignSelf: "center",
                marginTop: 10,
              }}
            />
            <View
              style={{
                backgroundColor: Colors.WHITE,
                bottom: 3,
                alignSelf: "center",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <AppText
                textType="semiBold12"
                style={{ color: Colors.BLACK, textAlign: "center" }}
              >
                {key.item.playerName}
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderWicketKeepers = () => {
    const rows = [];

    for (let i = 0; i < keepers?.length; i += 3) {
      const rowItems = keepers
        ?.slice(i, i + 3)
        .map((item: any) => <Items key={item.id} item={item} />);

      rows.push(
        <View key={i} style={style.row}>
          {rowItems}
        </View>
      );
    }

    return rows;
  };

  const renderBatters = () => {
    const rows = [];

    for (let i = 0; i < batsmans?.length; i += 3) {
      const rowItems = batsmans
        ?.slice(i, i + 3)
        .map((item: any) => <Items key={item.id} item={item} />);

      rows.push(
        <View key={i} style={style.row}>
          {rowItems}
        </View>
      );
    }

    return rows;
  };

  const renderAllrounder = () => {
    const rows = [];

    for (let i = 0; i < all_rounders?.length; i += 3) {
      const rowItems = all_rounders
        ?.slice(i, i + 3)
        .map((item: any) => <Items key={item.id} item={item} />);

      rows.push(
        <View key={i} style={style.row}>
          {rowItems}
        </View>
      );
    }

    return rows;
  };

  const renderBowlers = () => {
    const rows = [];

    for (let i = 0; i < bowlers?.length; i += 3) {
      const rowItems = bowlers
        ?.slice(i, i + 3)
        .map((item: any) => <Items key={item.id} item={item} />);

      rows.push(
        <View key={i} style={style.row}>
          {rowItems}
        </View>
      );
    }

    return rows;
  };

  return (
    <SafeAreaView style={style.container}>
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
                  name={"close"}
                  size={25}
                  color={Colors.WHITE}
                />
              </View>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10 }}>
              <AppText textType="bold12" style={{ color: Colors.WHITE }}>
                Team Preview
              </AppText>

              <AppText textType="bold12" style={{ color: Colors.LIGHTGREY }}>
                Brave warriors
              </AppText>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.3, marginTop: 8 }}>
            <AppText textType="bold12" style={{ color: Colors.LIGHTGREY }}>
              Players
            </AppText>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText textType="bold16" style={{ color: Colors.WHITE }}>
                {selectedPlayerList?.length ?? 0}
              </AppText>

              <AppText
                textType="semiBold12"
                style={{ color: Colors.LIGHTGREY }}
              >
                /11
              </AppText>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText textType="bold12" style={{ color: Colors.LIGHTGREY }}>
                {selectedMatchDetails?.team1?.teamSymbol}:
              </AppText>

              <AppText
                textType="bold14"
                style={{ color: Colors.WHITE, marginHorizontal: 3 }}
              >
                0
              </AppText>

              <AppText textType="bold12" style={{ color: Colors.LIGHTGREY }}>
                {selectedMatchDetails?.team2?.teamSymbol}:
              </AppText>

              <AppText
                textType="bold14"
                style={{ color: Colors.WHITE, marginHorizontal: 3 }}
              >
                0
              </AppText>
            </View>
          </View>
          <View style={{ flex: 0.3, alignItems: "flex-end" }}>
            <AppText textType="bold12" style={{ color: Colors.LIGHTGREY }}>
              Credits Left
            </AppText>

            <AppText textType="bold16" style={{ color: Colors.WHITE }}>
              12
            </AppText>
          </View>
        </View>

        <View style={{ marginTop: 5 }} />
      </View>

      <ImageBackground
        source={Images.cricketGround}
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
      >
        {selectedPlayerList?.length > 0 ? (
          <ScrollView>
            <AppText
              textType="semiBold12"
              style={{
                color: Colors.WHITE,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              WICKET-KEEPERS
            </AppText>

            <View style={{ marginTop: 5 }} />
            {renderWicketKeepers()}

            <AppText
              textType="semiBold12"
              style={{
                color: Colors.WHITE,
                textAlign: "center",
                marginTop: 15,
              }}
            >
              BATTERS
            </AppText>

            {renderBatters()}
            <View style={{ marginTop: 20 }} />

            <AppText
              textType="semiBold12"
              style={{
                color: Colors.WHITE,
                textAlign: "center",
                marginTop: 15,
              }}
            >
              ALL-ROUNDERS
            </AppText>

            {renderAllrounder()}

            <View style={{ marginTop: 20 }} />

            <AppText
              textType="semiBold12"
              style={{ color: Colors.WHITE, textAlign: "center" }}
            >
              BOWLERS
            </AppText>

            {renderBowlers()}
          </ScrollView>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.OVERLAY,
                borderRadius: 8,
                height: windowHeight * 0.15,
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText textType="semiBold12" style={{ color: Colors.WHITE }}>
                No players selected yet
              </AppText>

              <AppButton
                borderRadius={5}
                fontSize={13}
                backgroundColor={theme.background}
                fontColor={theme.text}
                fontFamily={Fonts.semiBold}
                height={40}
                width={"70%"}
                value={"START SELECTING"}
                marginTop={15}
                alignSelf={"center"}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default PreviewTeam;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.cardBackground,
    },
    row: {
      flexDirection: "row",
      width: "100%", // Adjust the width based on your styling needs
    },
  });
