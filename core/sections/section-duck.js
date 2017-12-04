import * as sectionService from "./sectionsService";

const isStart = action => action.sequence.type === "start";
const isSuccess = action =>
  action.sequence.type === "next" && !action.messageError;

const SECTION_LIST = "SECTION_LIST";
export const getSection = () => async (dispatch, getState) => {
  const { section } = getState();
  if (section.isLoading || section.isLoading) return;

  dispatch({
    type: SECTION_LIST,
    payload: sectionService.getSections()
  });
};

const SET_SECTION = "SET_SECTION";
export const setSection = section => async (dispatch, getState) => {
  dispatch({
    type: SET_SECTION,
    payload: section
  });
};

export default function reducer(
  state = {
    isLoading: false,
    sectionList: [],
    dataSource: [],
    messageError: null,
    currentSection: null
  },
  action
) {
  switch (action.type) {
    case SET_SECTION:
      return {
        ...state,
        currentSection: action.payload
      };
    case SECTION_LIST:
      if (isStart(action)) {
        return {
          ...state,
          isLoading: true,
          messageError: "",
          sectionList: [],
          dataSource: []
        };
      } else if (isSuccess(action)) {
        return {
          ...state,
          isLoading: false,
          sectionList: action.payload.sectionList,
          dataSource: action.payload.dataSource,
          currentSection: action.payload.sectionList
            ? action.payload.sectionList[0]
            : null
        };
      } else {
        return {
          ...state,
          isLoading: false,
          messageError: action.payload.messageError
        };
      }
    default:
      {
      }

      return state;
  }
}
