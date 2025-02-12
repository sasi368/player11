'use strict';
import React, {memo, useContext} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  useWindowDimensions,
} from 'react-native';
import {Colors} from '../Theme/Colors';
import {Fonts} from '../../assets/Fonts/Fonts';
import themeContext from '../Theme/themeContext';
import isEmpty from '../Helper/isEmpty';
import LottieView from 'lottie-react-native';
import {Images} from '../../assets/Images/Images';
import useDimensions from '../Theme/useDimensions';

const AppLoader = (props: any) => {
  const {loading, msg} = props;
  const theme = useContext(themeContext);
  const dimensions = useDimensions();

  return (
    <Modal transparent={true} visible={loading}>
      <View style={styles.modalBackground}>
        <LottieView
          source={Images.loadingAnime}
          style={{
            width: dimensions.width * 0.6,
            height: dimensions.height * 0.3,
          }}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default memo(AppLoader);
