import React from "react";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ActivityIndicator } from "react-native";
import Icon, { AppIcons } from "./AppIcons";
import { Colors } from "../Theme/Colors";
import isEmpty from "../Helper/isEmpty";
import themeContext from "../Theme/themeContext";
import { Fonts } from "../../assets/Fonts/Fonts";
import AppInput from "./AppInput";
import AppText from "./AppText";

const CountryCodePicker = (props: any) => {
  const { setCountryCode, isCodeVisible, setCountryname, modal } = props;
  const theme = useContext(themeContext);
  const [selectedArea, setSelectedArea] = useState<any>("");
  const [modalVisible, setModalVisible] = useState(false);
  //for search bar
  const onChangeSearch = (query: String) => setSearchQuery(query);
  //for search function
  const [searchQuery, setSearchQuery] = useState<String>("");
  const [state, setState] = useState<any>({
    data: [],
    loading: false,
  });
  const { data, loading } = state;

  const filterdData = searchQuery
    ? data.filter((item: any) => {
        const name = item.name.toUpperCase();
        const code = item.callingCode.toUpperCase();
        const textData = searchQuery.toUpperCase();
        return name?.indexOf(textData) > -1 || code?.indexOf(textData) > -1;
      })
    : data;

  const resetCache = () => {
    setModalVisible(false);
    setSearchQuery("");
  };

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  const fetchCountryCodes = async () => {
    try {
      let res = require("../../utils/countryList.json");
      let data = res?.map((item: any) => {
        return {
          code: item?.alpha2Code,
          name: item?.name,
          callingCode: `+${item?.callingCodes[0]}`,
          flag: `${item?.flags?.png}`,
        };
      });
      setState({ data: data });
      if (data?.length > 0) {
        let defaultData = data?.filter((a: any) => a.code == "IN");
        if (defaultData.length > 0) {
          setSelectedArea(defaultData[0]);
          const phoneCode = defaultData[0]?.callingCode;
          setCountryCode(phoneCode, "country_code");
        }
      }
    } catch (e) {
      console.log("e on fetchCountryCodes", e);
    }
  };

  const renderFlagImage = (imgs: any) => {
    return (
      <Image
        source={{ uri: imgs }}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
    );
  };

  const renderAreasCodesModal = () => {
    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedArea(item);
            const phoneCode = item?.callingCode;
            setCountryCode(phoneCode, "country_code");
            if (!isEmpty(setCountryname)) {
              setCountryname(item?.name);
            }

            resetCache();
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 15,
              marginHorizontal: 20,
            }}
          >
            <View style={{ flex: 0.85 }}>
              <AppText
                textType="medium16"
                style={{
                  color: theme.text,
                }}
              >
                {item?.name}{" "}
                {!isEmpty(isCodeVisible) ? "(" + item?.callingCode + ")" : null}
              </AppText>
            </View>
            <View
              style={{
                flex: 0.15,
                alignItems: "flex-end",
              }}
            >
              {item?.name == selectedArea?.name ? (
                <Icon
                  type={AppIcons.AntDesign}
                  name={"checkcircle"}
                  size={20}
                  color={Colors.PRIMARY}
                />
              ) : (
                <Icon
                  type={AppIcons.AntDesign}
                  name={"checkcircleo"}
                  size={20}
                  color={Colors.LIGHTGREY}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          resetCache();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AppInput
            backgroundColor={theme.cardBackground}
            fontColor={theme.text}
            fontSize={12}
            fontFamily={Fonts?.Medium}
            placeholderTextColor={Colors.LIGHTGREY}
            placeholder={"Search Country"}
            value={searchQuery}
            onChangeText={(txt: String) => {
              onChangeSearch(txt);
            }}
            leftIcon={"search1"}
            borderRadius={8}
            borderColor={"transparent"}
            height={50}
            alignSelf={"center"}
          />

          {isEmpty(filterdData) ? (
            <AppText
              textType="semiBold12"
              style={{
                alignSelf: "center",
                marginTop: 30,
                color: theme.text,
              }}
            >
              No Countries Found!
            </AppText>
          ) : (
            <FlatList
              data={filterdData}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
            />
          )}
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {isEmpty(selectedArea?.flag) ? (
          <ActivityIndicator size="small" color={theme.text} />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {renderFlagImage(selectedArea?.flag)}
            <AppText
              textType="semiBold12"
              style={{
                marginHorizontal: 3,
                color: theme.text,
              }}
            >
              {selectedArea?.callingCode}
            </AppText>
          </View>
        )}
      </TouchableOpacity>

      {modalVisible ? renderAreasCodesModal() : null}
    </>
  );
};

export default CountryCodePicker;
