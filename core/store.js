import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import promise from "./redux-promise";
import reducers from "./reducers-index";

const logger = createLogger({
  collapsed: true,
  diff: true,
  duration: true
});

const store = createStore(reducers, applyMiddleware(thunk, promise, logger));
export default store;
