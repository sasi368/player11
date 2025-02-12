import {SET_USER_DATA} from '../types';

const initialState = {};

const UserDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export {UserDataReducer};
