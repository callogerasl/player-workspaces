import * as model from "./loginViewModel";

const isStart = action => action.sequence.type === "start";
const isSuccess = action =>
  action.sequence.type === "next" && !action.payload.messageError;

const STATE_LIST = "STATE_LIST";
export const getStateList = () => (dispatch, getState) => {
  const { login } = getState();
  if (login.isLoading || login.isLoading) return;

  dispatch({
    type: STATE_LIST,
    payload: model.getStateList()
  });
};

const DISTRICT_LIST = "DISTRICT_LIST";
export const getDistrictList = item => async (dispatch, getState) => {
  const { login } = getState();
  if (login.isLoading || login.isLoading) return;

  dispatch({
    type: DISTRICT_LIST,
    payload: model.getDistrictList(item.key)
  });
};

const SCHOOL_LIST = "SCHOOL_LIST";
export const getSchoolList = item => async (dispatch, getState) => {
  const { login } = getState();
  if (login.isLoading || login.isLoading) return;

  dispatch({
    type: SCHOOL_LIST,
    payload: model.getSchoolList(item.key)
  });
};

const LOGIN = "LOGIN";
export const doLogin = userInfo => async (dispatch, getState) => {
  const { login } = getState();
  if (login.isLoading || login.isLoading) return;

  dispatch({
    type: LOGIN,
    payload: model.doOnlineLogin(
      userInfo.username,
      userInfo.pass,
      userInfo.state,
      userInfo.district,
      userInfo.school,
      userInfo.plataform
    )
  });
};

const LOG_OUT = "LOG_OUT";
export function onLogOut() {
  return {
    type: LOG_OUT
  };
}

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
