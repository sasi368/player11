import {StyleSheet, Image, View, ImageSourcePropType} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Animated, {useAnimatedStyle, interpolate} from 'react-native-reanimated';

interface Item {
  image: ImageSourcePropType;
}

interface CustomImage {
  item: Item;
  x: any;
  index: number;
  size: number;
  spacer: number;
}

const CustomImage = ({item, x, index, size, spacer}: CustomImage) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  // Get Image Width and Height to Calculate AspectRatio
  useLayoutEffect(() => {
    if (item.image) {
      const {width, height} = Image.resolveAssetSource(item.image);
      setAspectRatio(width / height);
    }
  }, [item.image]);

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * size, (index - 1) * size, index * size],
      [0.9, 1, 0.9],
    );
    return {
      transform: [{scale}],
    };
  });

  if (!item.image) {
    return <View style={{width: spacer}} key={index} />;
  }
  return (
    <View style={{width: size}} key={index}>
      <Animated.View style={[styles.imageContainer, style]}>
        <Image
          source={item.image}
          style={[styles.image, {aspectRatio: aspectRatio}]}
        />
      </Animated.View>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
  },
});
