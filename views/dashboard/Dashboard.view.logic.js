import Dashboard from "./Dashboard.view.js";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import React from "react";

const { height, width } = Dimensions.get("window");
import { logOut } from "core/login/login-actions";
import { getSection, setSection } from "core/sections/section-actions";

class DashboardLogic extends React.Component {
  state = {
    shouldShowSections: false,
    shouldShowLibrary: false
  };
  componentWillMount() {
    this.props.getSection();
  }
  onSelectSection = index => {
    let data = this.props.sectionList[index];
    this.props.setSection(data);
    this.setState({ shouldShowSections: false });
  };
  onMenuClick = () => {
    this.setState({ shouldShowSections: !this.state.shouldShowSections });
  };
  render() {
    const { props, state } = this;

    return (
      <Dashboard
        {...props}
        {...state}
        height={height}
        width={width}
        onShowCloseLibrary={() => {
          this.setState({ shouldShowLibrary: !this.state.shouldShowLibrary });
        }}
        onMenuClick={this.onMenuClick}
        onSelectSection={this.onSelectSection}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userInfo: state.login.userInfo,
    sectionList: state.section.sectionList,
    currentSection: state.section.currentSection,
    isLoading: state.section.isLoading
  };
}

export default connect(mapStateToProps, {
  logOut,
  getSection,
  setSection
})(DashboardLogic);
