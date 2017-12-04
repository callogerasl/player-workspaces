import DropdownButton from './DropdownButton.view.js';
import React from 'react';

export default class DropdownButtonLogic extends React.Component {
  state = { shouldShowModal: false, selectedItemLabel: '' };
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedItemLabel !== nextProps.selectedItemLabel) {
      this.setState({ selectedItemLabel: nextProps.selectedItemLabel });
    }
  }
  componentWillMount() {
    this.setState({
      marginTopCalc: (this.props.marginTop || 0) + 30,
    });
  }
  onSelectItem = index => {
    let item = this.props.list[index];
    if (item) {
      this.setState({ shouldShowModal: false, selectedItemLabel: item.label });
      this.props.onSelect(item);
    }
  };
  onClickDropDown = () => {
    this.setState({ shouldShowModal: !this.state.shouldShowModal });
  };
  render() {
    const { props, state } = this;

    return (
      <DropdownButton
        {...props}
        {...state}
        onClick={this.onClickDropDown}
        onSelectItem={this.onSelectItem}
      />
    );
  }
}
