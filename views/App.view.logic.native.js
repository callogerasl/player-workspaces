import React from "react";
import { Animated, Dimensions } from "react-native";
import { AppLoading, Font } from "expo";
import fonts from "./fonts.js";
import App from "./App.view.js";
import { connect } from "react-redux";
const { spring, Value } = Animated;
const { height, width } = Dimensions.get("window");

class AppLogic extends React.Component {
  // this is our animated value
  // we use react-native Animated for this, see their docs:
  // https://facebook.github.io/react-native/docs/animated.html
  a = new Value(0);

  state = {
    loading: true
  };

  componentWillMount() {
    this.cacheResourcesAsync();

    // and here we make it pop through a spring animation! :)
    spring(this.a, { toValue: 1 }).start();
  }

  // get the values we want to animate
  getAnimated() {
    return {
      transform: [
        {
          scale: this.a
        }
      ]
    };
  }

  render() {
    if (this.state.loading) return <AppLoading />;

    // pass the animated values to the view
    return (
      <App isLoggedIn={this.props.isLoggedIn} height={height} width={width} />
    );
  }

  async cacheResourcesAsync() {
    await Font.loadAsync(fonts);

    this.setState({
      loading: false
    });
  }
}

function mapStateToProps(state, props) {
  return { isLoggedIn: state.login.isLoggedIn };
}

export default connect(mapStateToProps, null)(AppLogic);
