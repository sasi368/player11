import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import React from 'react';
import Dot from './Dot';
import Animated from 'react-native-reanimated';

interface Data {
  image: ImageSourcePropType;
}
interface DotInterFace {
  data: Data[];
  x: Animated.SharedValue<number>;
  size: number;
}

const Pagination = ({data, x, size}: DotInterFace) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        return <Dot key={i} x={x} index={i} size={size} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
