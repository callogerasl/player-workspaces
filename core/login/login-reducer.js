import {
  STATE_LIST,
  DISTRICT_LIST,
  SCHOOL_LIST,
  LOGIN,
  LOG_OUT
} from "./login-actions";

import { isStart, isSuccess } from "../utils/utils";

export default function reducer(
  state = {
    isLoggedIn: false,
    isLoading: false,
    userInfo: null,
    messageError: "",
    stateList: [],
    districtList: [],
    schoolList: []
  },
  action
) {
  switch (action.type) {
    case STATE_LIST:
      return {
        ...state,
        isLoading: false,
        messageError: "",
        stateList: action.payload,
        districtList: [],
        schoolList: []
      };
    case DISTRICT_LIST:
      if (isStart(action)) {
        return {
          ...state,
          isLoading: true,
          messageError: "",
          districtList: [],
          schoolList: []
        };
      } else if (isSuccess(action)) {
        return {
          ...state,
          isLoading: false,
          districtList: action.payload,
          schoolList: []
        };
      } else {
        return {
          ...state,
          isLoading: false,
          messageError: action.payload.messageError
        };
      }
    case SCHOOL_LIST:
      if (isStart(action)) {
        return {
          ...state,
          messageError: "",
          isLoading: true,
          schoolList: []
        };
      } else if (isSuccess(action)) {
        return {
          ...state,
          isLoading: false,
          schoolList: action.payload
        };
      } else {
        return {
          ...state,
          isLoading: false,
          messageError: action.payload.messageError
        };
      }
    case LOGIN:
      if (isStart(action)) {
        return {
          ...state,
          isLoading: true,
          messageError: ""
        };
      } else if (isSuccess(action)) {
        return {
          ...state,
          messageError: "",
          isLoggedIn: true,
          isLoading: false,
          userInfo: action.payload.userInfo
        };
      } else {
        return {
          ...state,
          isLoading: false,
          messageError: action.payload.messageError
        };
      }
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false
      };

    default:
      return state;
  }
}
