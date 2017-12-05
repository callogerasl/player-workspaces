import LibraryView from "./LibraryView.view.js";
import { Dimensions } from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

export default class LibraryViewLogic extends React.Component {
  render() {
    const { props } = this;
    let widthCal = width * 0.98;
    return <LibraryView {...props} height={height} width={widthCal} />;
  }
}
