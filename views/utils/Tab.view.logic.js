import Tab from './Tab.view.js';
import React from 'react';

export default class TabLogic extends React.Component {
  render() {
    const { props } = this;

    return <Tab {...props} />;
  }
}
