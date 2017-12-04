import Main from './Main.view.js';
import React from 'react';

export default class MainLogic extends React.Component {
  render() {
    const { props } = this;

    return <Main {...props} />;
  }
}
