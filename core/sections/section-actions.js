import { getSections } from "./sections-service.js";

export const SECTION_LIST = "SECTION_LIST";
export const getSection = () => async (dispatch, getState) => {
  const { section, login } = getState();
  if (section.isLoading || section.isLoading) return;

  dispatch({
    type: SECTION_LIST,
    payload: getSections(login.userInfo.plataform, login.userInfo.role)
  });
};

export const SET_SECTION = "SET_SECTION";
export const setSection = section => async (dispatch, getState) => {
  dispatch({
    type: SET_SECTION,
    payload: section
  });
};
