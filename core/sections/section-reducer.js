import { SECTION_LIST, SET_SECTION } from "./section-actions";
import { isStart, isSuccess } from "../utils/utils";

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
