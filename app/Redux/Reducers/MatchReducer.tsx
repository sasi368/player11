import {SET_SELECTED_MATCH_DETAILS, SET_SELECTED_PLAYER_LIST} from '../types';

const initialState = {};

const selectedMatchDetailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELECTED_MATCH_DETAILS:
      return {
        ...state,
        details: action.data,
      };

    default:
      return state;
  }
};

const selectedPlayerListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELECTED_PLAYER_LIST:
      return {
        ...state,
        details: action.data,
      };

    default:
      return state;
  }
};

export {selectedMatchDetailReducer, selectedPlayerListReducer};
