import Toast from "react-native-simple-toast";
import DocumentPicker from "react-native-document-picker";
import { Alert } from "react-native";

export const handleToast = (msg) => {
  Toast.showWithGravityAndOffset(msg, Toast.SHORT, Toast.BOTTOM, 25, 50);
};

export const convert = (n) => {
  try {
    var sign = +n < 0 ? "-" : "",
      toStr = n.toString();
    if (!/e/i.test(toStr)) {
      return n;
    }
    var [lead, decimal, pow] = n
      .toString()
      .replace(/^-/, "")
      .replace(/^([0-9]+)(e.*)/, "$1.$2")
      .split(/e|\./);
    return +pow < 0
      ? sign +
          "0." +
          "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) +
          lead +
          decimal
      : sign +
          lead +
          (+pow >= decimal.length
            ? decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))
            : decimal.slice(0, +pow) + "." + decimal.slice(+pow));
  } catch (err) {
    return 0;
  }
};

export const longDecimals = (num, maximum) => {
  let max = maximum >= 6 ? 6 : maximum;
  num = convert(num);
  // num = toFixed(num, max)
  // Split the string into integer and fractional parts
  const [integerPart, fractionalPart] = num.toString().split(".");
  // If there are more than 6 decimal places, show an ellipsis
  // console.log(fractionalPart?.length, 'fractionalPart.length');

  if (fractionalPart && fractionalPart.length > max) {
    const truncatedFraction = fractionalPart.substring(0, max);
    // const integerPartFraction = integerPart.substring(0, max);
    return `${integerPart}.${truncatedFraction.substring(
      0,
      2
    )}...${fractionalPart.slice(-2)}`;
  }

  return num; // No need for ellipsis
};

export const nFormatter = (num, digits = 2) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e5, symbol: "L" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    // { value: 1e15, symbol: "B" },
    // { value: 1e9, symbol: "Qa" },
    // { value: 1e10, symbol: "Qi" },
    // { value: 1e11, symbol: "Sx" },
    // { value: 1e12, symbol: "Sp" },
    // { value: 1e13, symbol: "Oc" },
    // { value: 1e14, symbol: "No" },
    // { value: 1e15, symbol: "Dc" },
    // { value: 1e18, symbol: "Ud" },
    // { value: 1e21, symbol: "Dd" },
    // { value: 1e24, symbol: "Td" },
    // { value: 1e27, symbol: "Qad" },
    // { value: 1e30, symbol: "Qid" },
  ];
  if (num < 1000) {
    return longDecimals(num, 6);
  }
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(2).replace(rx, "$1") + item.symbol
    : "0";
};

export const FileUpload = (setState) => {
  DocumentPicker.pickSingle({
    type: [DocumentPicker.types.allFiles],
  }).then((pickerResult) => {
    if (pickerResult.size >= 1000000) {
      Alert.alert(
        "pickerResult",
        "File size must be less than or equal to 1 mb"
      );
      setState({});
    } else if (
      pickerResult.name.slice(pickerResult.name.length - 3) == "jpg" ||
      pickerResult.name.slice(pickerResult.name.length - 3) == "png" ||
      pickerResult.name.slice(pickerResult.name.length - 3) == "peg" ||
      pickerResult.name.slice(pickerResult.name.length - 3) == "jpeg"
    ) {
      setState(pickerResult);
    } else {
      Alert.alert(
        "pickerResult",
        "Invalid file format...Please choose valid format!"
      );
      setState({});
    }
  });
};
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//check every value exist in another array
export const checker = (arr, target) => target.every((v) => arr.includes(v));
