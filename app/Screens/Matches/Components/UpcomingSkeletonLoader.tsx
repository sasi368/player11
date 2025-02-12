import React, { useContext } from "react";
import { View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import themeContext from "../../../Global/Theme/themeContext";
import { Colors } from "../../../Global/Theme/Colors";

const UpcomingSkeletonLoader = () => {
  const theme = useContext(themeContext);
  const skeletonArrs = [0, 1, 2, 3, 4];

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          width: "100%",
          backgroundColor: theme.background,
          padding: 10,
          marginTop: 10,
          borderRadius: 10,
        }}
      >
        {skeletonArrs?.map((item, index) => {
          return (
            <View
              style={{
                marginTop: 10,
                backgroundColor: theme.background,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
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
                    alignItems="center"
                  >
                    <SkeletonPlaceholder.Item
                      height={10}
                      width={"50%"}
                      borderRadius={10}
                    />
                    <SkeletonPlaceholder.Item
                      height={10}
                      width={"20%"}
                      borderRadius={10}
                    />
                  </SkeletonPlaceholder.Item>

                  <SkeletonPlaceholder.Item
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop={5}
                    backgroundColor={"red"}
                  >
                    <SkeletonPlaceholder.Item
                      height={45}
                      width={45}
                      borderRadius={25}
                    />
                    <SkeletonPlaceholder.Item width={"50%"} alignItems="center">
                      <SkeletonPlaceholder.Item
                        height={10}
                        width={"50%"}
                        borderRadius={10}
                        marginTop={5}
                      />
                      <SkeletonPlaceholder.Item
                        height={10}
                        width={"35%"}
                        borderRadius={10}
                        marginTop={5}
                      />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                      height={45}
                      width={45}
                      borderRadius={25}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default UpcomingSkeletonLoader;
