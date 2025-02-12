import React, { useContext, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import themeContext from "../../../Global/Theme/themeContext";
import { Images } from "../../../assets/Images/Images";
import { Colors } from "../../../Global/Theme/Colors";
import Icon, { AppIcons } from "../../../Global/Components/AppIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import isEmpty from "../../../Global/Helper/isEmpty";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedPlayerList } from "../../../Redux/Actions/MatchAction";
import Ripple from "react-native-material-ripple";
import AppText from "../../../Global/Components/AppText";
import useDimensions from "../../../Global/Theme/useDimensions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PlayerList = (props: any) => {
  const { width } = useDimensions();

  //theme config
  const theme = useContext(themeContext);
  const style = styles(theme);
  const dispatch = useDispatch();
  const refRBSheet: any = useRef();
  const { players } = props?.route?.params;

  const selectedPlayerList = useSelector(
    (state: any) => state.selectedPlayerListReducer.details
  );

  const addOrRemovePlayers = (item: any) => {
    if (!isEmpty(selectedPlayerList)) {
      //check if player exist
      const index = selectedPlayerList.indexOf(item);
      if (index > -1) {
        //if exist remove
        const newArray = selectedPlayerList.filter((obj: any) => {
          return obj?.playerId !== item?.playerId;
        });
        item.isSelected = false;
        dispatch(addSelectedPlayerList(newArray));
      } else {
        //not exist add
        item.isSelected = true;
        const data = [...selectedPlayerList, ...[item]];
        dispatch(addSelectedPlayerList(data));
      }
    } else {
      //first player add
      item.isSelected = true;
      dispatch(addSelectedPlayerList([item]));
    }
  };

  const renderPlayersDetails = ({ item, index }: any) => {
    return (
      <Ripple
        rippleOpacity={0.2}
        rippleDuration={400}
        disabled={
          selectedPlayerList?.length == 11 && !item?.isSelected ? true : false
        }
        onPress={() => {
          addOrRemovePlayers(item);
        }}
      >
        <View
          style={[
            style.playerListView,
            {
              width: width >= 1100 ? width * 0.8 : width,
              backgroundColor: item?.isSelected
                ? Colors.PRIMARYSHADE
                : theme.background,
              opacity:
                selectedPlayerList?.length == 11 && !item?.isSelected ? 0.3 : 1,
            },
          ]}
        >
          <View
            style={{
              flex: 1.1,
              alignItems: "center",
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

            <View style={style.metaView}>
              <AppText textType="bold12" style={style.metaNameTxt}>
                {item?.teamName}
              </AppText>
            </View>
          </View>
          <View
            style={{
              flex: 2.6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{}}>
                <AppText textType="semiBold12" style={{ color: theme.text }}>
                  {item?.playerName}
                </AppText>

                <AppText
                  textType="regular12"
                  style={{ color: Colors.LIGHTGREY }}
                >
                  Sel by 0.94%
                </AppText>
              </View>

              <AppText textType="semiBold12" style={{ color: theme.text }}>
                0
              </AppText>
            </View>
          </View>
          <View style={{ flex: 1.2, alignItems: "flex-end" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AppText
                textType="semiBold12"
                style={{ color: theme.text, marginHorizontal: 10 }}
              >
                7.5
              </AppText>

              <Icon
                type={AppIcons.AntDesign}
                name={item?.isSelected ? "minuscircle" : "pluscircle"}
                size={25}
                color={item?.isSelected ? Colors.RED : Colors.GREEN}
              />
            </View>
          </View>
        </View>
      </Ripple>
    );
  };

  const renderFooter = () => (
    <View style={{ height: 100, backgroundColor: theme.background }} />
  );

  return (
    <SafeAreaView style={style.container}>
      {/* {_topSection()} */}

      {/* player list section */}
      <FlatList
        data={players}
        keyExtractor={(item) => item._id}
        renderItem={renderPlayersDetails}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />

      {/* filter section */}
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        animationType="slide"
        customStyles={{
          container: {
            backgroundColor: theme.background,
            width: windowWidth,
            height: windowHeight * 0.3,
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
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              padding: 8,
            }}
          >
            <AppText textType="bold14" style={{ color: theme.text }}>
              Filter By Teams
            </AppText>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
              }}
            >
              <Icon
                type={AppIcons.AntDesign}
                name={"close"}
                size={20}
                color={Colors.LIGHTGREY}
              />
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};
export default PlayerList;

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    metaView: {
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 2,
      position: "absolute",
      alignSelf: "flex-start",
      marginHorizontal: 20,
      justifyContent: "center",
    },
    metaNameTxt: {
      color: Colors.WHITE,
    },

    playerListView: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
  });
