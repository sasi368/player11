import Toast from 'react-native-simple-toast';

const displayToast = (msg: string) => {
  Toast.showWithGravityAndOffset(msg, Toast.SHORT, Toast.BOTTOM, 25, 50);
};

export {displayToast};
