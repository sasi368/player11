import React, {FunctionComponent} from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {Fonts} from '../../assets/Fonts/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type CustomTextProps = {
  style?: TextStyle | TextStyle[];
  textType?:
    | 'regular10'
    | 'regular12'
    | 'regular14'
    | 'regular16'
    | 'regular18'
    | 'medium10'
    | 'medium12'
    | 'medium14'
    | 'medium16'
    | 'medium18'
    | 'semiBold10'
    | 'semiBold12'
    | 'semiBold14'
    | 'semiBold16'
    | 'semiBold18'
    | 'bold9'
    | 'bold10'
    | 'bold12'
    | 'bold14'
    | 'bold16'
    | 'bold18';
  children: any;
};

const AppText: FunctionComponent<CustomTextProps> = ({
  children,
  textType,
  style,
}) => {
  let textStyle: {};
  switch (textType) {
    //regular fonts
    case 'regular10':
      textStyle = styles.regular10;
      break;
    case 'regular12':
      textStyle = styles.regular12;
      break;
    case 'regular14':
      textStyle = styles.regular14;
      break;
    case 'regular16':
      textStyle = styles.regular16;
      break;
    case 'regular18':
      textStyle = styles.regular18;
      break;
    //Medium fonts
    case 'medium10':
      textStyle = styles.medium10;
      break;
    case 'medium12':
      textStyle = styles.medium12;
      break;
    case 'medium14':
      textStyle = styles.medium14;
      break;
    case 'medium16':
      textStyle = styles.medium16;
      break;
    case 'medium18':
      textStyle = styles.medium18;
      break;
    //semiBold fonts
    case 'semiBold10':
      textStyle = styles.semiBold10;
      break;
    case 'semiBold12':
      textStyle = styles.semiBold12;
      break;
    case 'semiBold14':
      textStyle = styles.semiBold14;
      break;
    case 'semiBold16':
      textStyle = styles.semiBold16;
      break;
    case 'semiBold18':
      textStyle = styles.semiBold18;
      break;
    //Bold fonts
    case 'bold9':
      textStyle = styles.bold9;
      break;
    case 'bold10':
      textStyle = styles.bold10;
      break;
    case 'bold12':
      textStyle = styles.bold12;
      break;
    case 'bold14':
      textStyle = styles.bold14;
      break;
    case 'bold16':
      textStyle = styles.bold16;
      break;
    case 'bold18':
      textStyle = styles.bold18;
      break;

    default:
      textStyle = styles.regular14;
      break;
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return <Text style={[textStyle, {...passedStyles}]}>{children}</Text>;
};

const styles = StyleSheet.create({
  regular10: {
    fontFamily: Fonts.Regular,
    fontSize: hp('1.3%'),
  },
  regular12: {
    fontFamily: Fonts.Regular,
    fontSize: hp('1.5%'),
  },
  regular14: {
    fontFamily: Fonts.Regular,
    fontSize: hp('1.7%'),
  },
  regular16: {
    fontFamily: Fonts.Regular,
    fontSize: hp('1.9%'),
  },
  regular18: {
    fontFamily: Fonts.Regular,
    fontSize: hp('2.1%'),
  },
  medium10: {
    fontFamily: Fonts.Medium,
    fontSize: hp('1.3%'),
  },
  medium12: {
    fontFamily: Fonts.Medium,
    fontSize: hp('1.5%'),
  },
  medium14: {
    fontFamily: Fonts.Medium,
    fontSize: hp('1.7%'),
  },
  medium16: {
    fontFamily: Fonts.Medium,
    fontSize: hp('1.9%'),
  },
  medium18: {
    fontFamily: Fonts.Medium,
    fontSize: hp('2.1%'),
  },

  semiBold10: {
    fontFamily: Fonts.semiBold,
    fontSize: hp('1.3%'),
  },
  semiBold12: {
    fontFamily: Fonts.semiBold,
    fontSize: hp('1.5%'),
  },
  semiBold14: {
    fontFamily: Fonts.semiBold,
    fontSize: hp('1.7%'),
  },
  semiBold16: {
    fontFamily: Fonts.semiBold,
    fontSize: hp('1.9%'),
  },
  semiBold18: {
    fontFamily: Fonts.semiBold,
    fontSize: hp('2.1%'),
  },
  bold9: {
    fontFamily: Fonts.Bold,
    fontSize: hp('1.1%'),
  },
  bold10: {
    fontFamily: Fonts.Bold,
    fontSize: hp('1.3%'),
  },
  bold12: {
    fontFamily: Fonts.Bold,
    fontSize: hp('1.5%'),
  },
  bold14: {
    fontFamily: Fonts.Bold,
    fontSize: hp('1.7%'),
  },
  bold16: {
    fontFamily: Fonts.Bold,
    fontSize: hp('1.9%'),
  },
  bold18: {
    fontFamily: Fonts.Bold,
    fontSize: hp('2.1%'),
  },
});

export default AppText;
