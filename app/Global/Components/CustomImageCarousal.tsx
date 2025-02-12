import {ImageSourcePropType, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated';
import Pagination from './Pagination';
import CustomImage from './CustomImage';
import useDimensions from '../Theme/useDimensions';

interface Data {
  image: ImageSourcePropType;
}

interface CustomImageCarousal {
  data: Data[];
  autoPlay: any;
  pagination: boolean;
}

const CustomImageCarousal = ({
  data,
  autoPlay,
  pagination,
}: CustomImageCarousal) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const interval = useRef<NodeJS.Timeout | null>(null);

  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [newData, setNewData] = useState([
    {key: 'spacer-left'},
    ...data,
    {key: 'spacer-right'},
  ]);
  const dimensions = useDimensions();
  const width = dimensions.width;
  const height = dimensions.height;

  const SIZE = height * 0.38;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);

  // Update newData if data change
  useEffect(() => {
    setNewData([{key: 'spacer-left'}, ...data, {key: 'spacer-right'}]);
  }, [data]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: e => {
      offSet.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      let _offSet = offSet.value;
      interval.current = setInterval(() => {
        if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
          _offSet = 0;
        } else {
          _offSet = Math.floor(_offSet + SIZE);
        }
        scrollViewRef.current?.scrollTo({x: _offSet, y: 0});
      }, 2000);
    } else if (interval.current) {
      clearInterval(interval.current);
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onScrollBeginDrag={e => {
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={() => {
          setIsAutoPlay(autoPlay);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {newData.map((item: any, index) => {
          return (
            <CustomImage
              key={index}
              index={index}
              item={item}
              x={x}
              size={SIZE}
              spacer={SPACER}
            />
          );
        })}
      </Animated.ScrollView>
      {pagination && <Pagination data={data} x={x} size={SIZE} />}
    </View>
  );
};

export default CustomImageCarousal;
