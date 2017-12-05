import { combineReducers } from "redux";

import section from "./sections/section-reducer";
import login from "./login/login-reducer";

export default combineReducers({ section, login });
