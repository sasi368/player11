import { Dimensions } from "react-native";

interface onChange {
  text: any;
  input: any;
  isTrim?: boolean;
}
interface errValues {
  error?: any;
  input?: any;
}
export const windowWidth=Dimensions.get('window').width;
export const windowHeight=Dimensions.get('window').height;
export const onChangeValues = ({text, input, isTrim}: onChange) => {
  return {
    values: (prevState: any) => ({
      ...prevState,
      [input]:
        isTrim != undefined ? (isTrim == false ? text : text.trimEnd()) : text,
    }),
  };
};
export const errorValues = ({error, input}: errValues) => {
  return {
    errors: (prevState: any) => ({...prevState, [input]: error}),
  };
};
