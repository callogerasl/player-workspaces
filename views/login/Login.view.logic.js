import Login from "./Login.view.js";
import React from "react";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import * as envDetails from "core/utils/envDetails";
import * as utils from "core/utils/utils";
import {
  getStateList,
  getDistrictList,
  getSchoolList,
  doLogin
} from "core/login/login-duck";

const { height, width } = Dimensions.get("window");

//uid=jrn17stg5,o=88200010,dc=88200009,st=CA
class LoginLogic extends React.Component {
  state = {
    tab: "middle-school",
    messageError: "",
    username: "collte",
    password: "Password@1",
    selectedState: "CA",
    selectedDistrict: "88200009",
    selectedSchool: "88200010"
  };
  componentWillMount() {
    this.props.getStateList();
  }
  componentDidMount() {
    //this.onLoginClick();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.messageError !== nextProps.messageError) {
      this.setState({ messageError: nextProps.messageError });
    }
  }
  selectTab = tab => {
    this.setState({ tab });
  };
  onCancelState = () => {
    this.setState({
      selectedState: "",
      selectedDistrict: "",
      selectedSchool: ""
    });
  };
  onSelectState = item => {
    this.setState({ selectedState: item.key });
    this.props.getDistrictList(item);
  };
  onCancelDistrict = () => {
    this.setState({
      selectedDistrict: "",
      selectedSchool: ""
    });
  };
  onSelectDistrict = item => {
    this.setState({ selectedDistrict: item.key });
    this.props.getSchoolList(item);
  };
  onCancelSchool = () => {
    this.setState({ selectedSchool: "" });
  };
  onSelectSchool = item => {
    this.setState({ selectedSchool: item.key });
  };
  onChangeUser = text => {
    this.setState({ username: text });
  };
  onChangePassword = text => {
    this.setState({ password: text });
  };
  onLoginClick = () => {
    let { state } = this;
    if (state.selectedState === "") {
      this.setState({ messageError: "Please select the State" });
    } else if (state.username === "") {
      this.setState({ messageError: "User can't be empty" });
    } else if (state.password === "") {
      this.setState({ messageError: "Password can't be empty" });
    } else {
      let userInfo = {
        username: state.username,
        pass: state.password,
        state: state.selectedState,
        district: state.selectedDistrict,
        school: state.selectedSchool,
        plataform:
          state.tab === "elementary" ? envDetails.getTc() : envDetails.getHmof()
      };

      this.props.doLogin(userInfo);
    }
  };
  render() {
    const { props, state } = this;
    return (
      <Login
        {...props}
        {...state}
        selectTab={this.selectTab}
        onCancelState={this.onCancelState}
        onSelectState={this.onSelectState}
        onCancelDistrict={this.onCancelDistrict}
        onSelectDistrict={this.onSelectDistrict}
        onCancelSchool={this.onCancelSchool}
        onSelectSchool={this.onSelectSchool}
        onLoginClick={this.onLoginClick}
        onChangeUser={this.onChangeUser}
        onChangePassword={this.onChangePassword}
        height={height}
        width={width}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return state.login;
}

export default connect(mapStateToProps, {
  getStateList,
  getDistrictList,
  getSchoolList,
  doLogin
})(LoginLogic);
