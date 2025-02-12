import React, { useContext } from "react";
import { View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import themeContext from "../../../Global/Theme/themeContext";
import { Colors } from "../../../Global/Theme/Colors";

const ContestSkeletonLoader = () => {
  const theme = useContext(themeContext);
  const skeletonArrs = [0, 1, 2, 3, 4, 5];

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      {skeletonArrs?.map((item, index) => {
        return (
          <View
            style={{
              width: "90%",
              backgroundColor: theme.background,
              padding: 10,
              borderRadius: 15,
              marginTop: 20,
            }}
          >
            <SkeletonPlaceholder
              key={index}
              backgroundColor={theme.background}
              enabled={true}
              speed={700}
              highlightColor={Colors.LIGHTGREY}
            >
              <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <SkeletonPlaceholder.Item
                    height={7}
                    width={"30%"}
                    borderRadius={10}
                  />
                  <SkeletonPlaceholder.Item
                    height={30}
                    width={"30%"}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item marginTop={20}>
                  <SkeletonPlaceholder.Item
                    height={8}
                    width={"100%"}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  justifyContent="space-between"
                  marginTop={20}
                >
                  <SkeletonPlaceholder.Item
                    height={10}
                    width={"30%"}
                    borderRadius={10}
                  />
                  <SkeletonPlaceholder.Item
                    height={10}
                    width={"30%"}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  justifyContent="space-between"
                  marginTop={8}
                >
                  <SkeletonPlaceholder.Item
                    height={10}
                    width={"25%"}
                    borderRadius={10}
                  />
                  <SkeletonPlaceholder.Item
                    height={10}
                    width={"25%"}
                    borderRadius={10}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </View>
  );
};

export default ContestSkeletonLoader;
