import {
  SelectedMatchDetailsRedux,
  SelectedPlayerListRedux,
} from '../../Screens/Home/interfaces';
import {SET_SELECTED_MATCH_DETAILS, SET_SELECTED_PLAYER_LIST} from '../types';

export const addSelectedMatchDetails = (item: SelectedMatchDetailsRedux) => ({
  type: SET_SELECTED_MATCH_DETAILS,
  data: item,
});

export const addSelectedPlayerList = (item: SelectedPlayerListRedux) => ({
  type: SET_SELECTED_PLAYER_LIST,
  data: item,
});
