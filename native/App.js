import React from "react";
import { Provider } from "react-redux";
import AppView from "views/App.view.logic.js";
import store from "core/store.js";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppView />
      </Provider>
    );
  }
}
