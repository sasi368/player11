import isEmpty from "../../Global/Helper/isEmpty";
import { displayToast } from "../../Global/Components/Toast";

export const loginValidation = async (inputs: any, setErrors: any) => {
  let isValid = true;
  if (isEmpty(inputs?.mobile_no)) {
    setErrors({ mobile_no: "Enter Mobile Number" });
    isValid = false;
  } else if (!inputs?.checked) {
    displayToast("Check the Terms & Condition");
    isValid = false;
  }
  return {
    isValid: isValid,
  };
};
