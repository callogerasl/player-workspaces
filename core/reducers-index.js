import { combineReducers } from "redux";

import section from "./sections/section-duck";
import login from "./login/login-duck";

export default combineReducers({ section, login });
