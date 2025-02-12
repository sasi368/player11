import {LOG_OUT, SET_USER_DATA} from '../types';

export const addUserData = (item: any, dispatch: any) => {
  dispatch({
    type: SET_USER_DATA,
    data: item,
  });
};

export const logoutRedux = () => ({
  type: LOG_OUT,
});
