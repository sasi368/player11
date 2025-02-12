'use strict';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  View,
} from 'react-native';
import {Colors} from '../Theme/Colors';
import AppText from './AppText';

const windowsWidth = Dimensions.get('window').width;

const AppButton = (props: any) => {
  var backgroundColor = Colors.PRIMARY;

  if (props.disabled) {
    backgroundColor = 'grey';
  } else if (props.backgroundColor) {
    backgroundColor = props.backgroundColor;
  } else {
    backgroundColor = Colors.PRIMARY;
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      disabled={props.disabled}
      style={[
        {
          width: props.width ? props.width : windowsWidth * 0.9,
          borderRadius: props.borderRadius,
          borderColor: props.borderColor,
          borderWidth: props.borderWidth,
          height: props.height ? props.height : 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: backgroundColor,
          elevation: props.elevation,
          marginBottom: props.marginBottom,
          alignSelf: props.alignSelf,
          marginTop: props.marginTop,
        },
        props.style,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.imageName && (
          <Image
            source={props.imageName}
            style={[
              {
                display: props.loading ? 'none' : 'flex',
                width: 20,
                height: 20,
              },
            ]}
          />
        )}

        <AppText
          style={[
            {
              display: props.loading ? 'none' : 'flex',
              color: props.fontColor,
              fontSize: props.fontSize,
              fontFamily: props.fontFamily,
              fontWeight: props.fontWeight,
              marginHorizontal: props.imageName ? 5 : props.marginHorizontal,
            },
          ]}>
          {props.value}
        </AppText>
      </View>
      <ActivityIndicator
        style={{display: props.loading ? 'flex' : 'none'}}
        color={Colors.WHITE}
      />
    </TouchableOpacity>
  );
};

export default AppButton;
