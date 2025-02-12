import {LoginDataRedux} from '../../Screens/Initial/Interfaces';
import {SET_LOGIN_DATA} from '../types';

//for save
export const addLoginData = (item: LoginDataRedux) => ({
  type: SET_LOGIN_DATA,
  data: item,
});
