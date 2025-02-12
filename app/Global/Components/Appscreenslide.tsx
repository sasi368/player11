import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const SlideScreen = (props: any) => {
  const data = props.data;
  const flatListRef = useRef<FlatList<any> | null>(null);

  const [scrollY, setScrollY] = useState(0);
  const [tempScrollY, setTempScrollY] = useState(0);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index: scrollY});
    }
  }, [scrollY]);

  const handleScroll = (event: {nativeEvent: {contentOffset: {x: any}}}) => {
    const offsetY = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetY / (width * 0.9));
    const ind = (offsetY / (width * 0.9)).toFixed(0);
    setTempScrollY(index);
  };

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * 0.91 * index,
    index,
  });

  return (
    <View
      style={[
        styles.container,
        props.containerStyle && {...props.containerStyle},
      ]}>
      <FlatList
        horizontal
        style={{
          height: '100%',
          maxHeight: '100%',
          alignSelf: 'center',
          ...props.style,
        }}
        ref={flatListRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item}
        renderItem={props?.renderItems}
        onScroll={handleScroll}
        onMomentumScrollEnd={() => {
          setScrollY(tempScrollY);
        }}
        onMomentumScrollBegin={event => {
          const offsetY = event.nativeEvent.contentOffset.x;
          console.log(
            offsetY.toFixed(0),
            '==',
            ((data.length - 1) * width * 0.9).toFixed(0),
          );

          if (offsetY == 0) {
            setScrollY(data.length - 1);
          } else if (
            offsetY.toFixed(0) == ((data.length - 1) * width * 0.9).toFixed(0)
          ) {
            setScrollY(0);
          }
        }}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  item: {
    // paddingHorizontal:15,
    alignSelf: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    // margin: width * 0.05,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    height: '5%',
    // marginHorizontal:15,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    alignItems: 'center',
    backgroundColor: 'coral',
    // borderWidth: 1,
    // borderColor: 'black',
  },
});

export default SlideScreen;
