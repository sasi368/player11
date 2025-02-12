import EncryptedStorage from "react-native-encrypted-storage";

const storeData = async (dataToSave: any, key: string) => {
  try {
    const jsonValue = JSON.stringify(dataToSave);
    const storedResult = await EncryptedStorage.setItem(key, jsonValue);

    return {
      storedResult: storedResult,
      status: true,
    };
  } catch (e) {
    console.log("store data e", e);
    return {
      storedResult: "",
      status: false,
    };
  }
};

const getData = async (key: string) => {
  try {
    let jsonValue = await EncryptedStorage.getItem(key);
    let result = jsonValue ? JSON.parse(jsonValue) : null;
    return {
      storedResult: result,
      token: result?.token,
      status: true,
    };
  } catch (e) {
    console.log(e, "getData e");
    return {
      storedResult: "",
      token: "",
      status: false,
    };
  }
};

export { storeData, getData };
