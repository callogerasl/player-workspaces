import LibraryView from "./LibraryView.view.js";
import React from "react";

export default class LibraryViewLogic extends React.Component {
  render() {
    const { props } = this;
    return <LibraryView {...props} height="50%" width="100%" />;
  }
}
