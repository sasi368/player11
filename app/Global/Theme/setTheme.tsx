import EncryptedStorage from 'react-native-encrypted-storage';

export const saveTheme = async data => {
  try {
    await EncryptedStorage.setItem('themeData', JSON.stringify(data));
    retrieveTheme();
  } catch (error) {}
};

export const retrieveTheme = async () => {
  try {
    const themeData = await EncryptedStorage.getItem('themeData');
    if (themeData !== null) {
      global.themeData = JSON.parse(themeData);
    }
  } catch (error) {}
};

export const getThemeStatus = async () => {
  const themeData = await EncryptedStorage.getItem('themeData');
  global.themeData = themeData;
  if (
    global.themeData != undefined &&
    global.themeData != null &&
    global.themeData == 'false'
  ) {
    return {status: false};
  } else {
    return {status: true};
  }
};
