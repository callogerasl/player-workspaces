import React from "react";
import App from "./App.view.js";
import { connect } from "react-redux";

class AppLogic extends React.Component {
  render() {
    // pass the animated values to the view
    return (
      <App isLoggedIn={this.props.isLoggedIn} height="100%" width="100%" />
    );
  }
}

function mapStateToProps(state, props) {
  return { isLoggedIn: state.login.isLoggedIn };
}

export default connect(mapStateToProps)(AppLogic);
