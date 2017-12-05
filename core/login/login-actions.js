import * as lists from "./lists.js";
import { getDistricts, getSchools, authenticate } from "./login-service.js";

export const STATE_LIST = "STATE_LIST";
export const getStateList = () => (dispatch, getState) => {
  const { login } = getState();
  if (login.isLoading || login.isLoading) return;
  dispatch({
    type: STATE_LIST,
    payload: lists.stateList
  });
};

export const DISTRICT_LIST = "DISTRICT_LIST";
export const getDistrictList = item => async (dispatch, getState) => {
  const { login } = getState();
  if (login.isLoading || login.isLoading) return;

  dispatch({
    type: DISTRICT_LIST,
    payload: getDistricts(item.key)
  });
};

export const SCHOOL_LIST = "SCHOOL_LIST";
export const getSchoolList = item => async (dispatch, getState) => {
  const { login } = getState();
  if (login.isLoading || login.isLoading) return;

  dispatch({
    type: SCHOOL_LIST,
    payload: getSchools(item.key)
  });
};

export const LOGIN = "LOGIN";
export const doLogin = userInfo => async (dispatch, getState) => {
  const { login } = getState();
  if (login.isLoading || login.isLoading) return;

  dispatch({
    type: LOGIN,
    payload: authenticate(
      userInfo.username,
      userInfo.pass,
      userInfo.state,
      userInfo.district,
      userInfo.school,
      userInfo.plataform
    )
  });
};

export const LOG_OUT = "LOG_OUT";
export function logOut() {
  return {
    type: LOG_OUT
  };
}
