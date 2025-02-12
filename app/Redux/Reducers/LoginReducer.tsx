import {SET_LOGIN_DATA} from '../types';

const initialState = {};

const loginDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        loginData: action.data,
      };

    default:
      return state;
  }
};

export {loginDataReducer};
