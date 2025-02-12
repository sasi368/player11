import {combineReducers, createStore} from 'redux';
import {loginDataReducer} from './Reducers/LoginReducer';
import {
  selectedMatchDetailReducer,
  selectedPlayerListReducer,
} from './Reducers/MatchReducer';
import {UserDataReducer} from './Reducers/UserReducer';

const appReducer = combineReducers({
  loginDataReducer: loginDataReducer,
  selectedMatchDetailReducer: selectedMatchDetailReducer,
  selectedPlayerListReducer: selectedPlayerListReducer,
  UserDataReducer: UserDataReducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOG_OUT') {
    state = initialState;
  }

  return appReducer(state, action);
};

const configureStore = () => createStore(rootReducer);

export default configureStore;
