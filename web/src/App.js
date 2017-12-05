import React, { Component } from "react";
import AppView from "views/App.view.js";
import { Provider } from "react-redux";
import store from "core/store.js";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppView />
      </Provider>
    );
  }
}

export default App;
