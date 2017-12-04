import DropdownModal from './DropdownModal.view.js';
import React from 'react';

export default class DropdownModalLogic extends React.Component {
  state = { shouldShowModal: false, listSearch: [], selectedItemLabel: '' };
  componentWillMount() {
    this.setState({
      listSearch: this.props.list,
      marginTopCalc: (this.props.marginTop || 0) + 40,
    });
  }
  onChangeText = text => {
    if (text === '') {
      this.setState({ shouldShowModal: false, selectedItemLabel: '' });
      this.props.onCancel();
    } else {
      var options = this.props.list;
      const filter = text.toLowerCase();
      const filtered = !filter.length
        ? options
        : options.filter(
            ({ searchKey, label, key }) =>
              0 <= label.toLowerCase().indexOf(filter) ||
              (searchKey && 0 <= searchKey.toLowerCase().indexOf(filter))
          );

      this.setState({
        shouldShowModal: true,
        listSearch: filtered,
        selectedItemLabel: text,
      });
    }
  };
  onSelectItem = index => {
    let item = this.state.listSearch[index];
    if (item) {
      this.setState({ shouldShowModal: false, selectedItemLabel: item.label });
      this.props.onSelect(item);
    }
  };
  render() {
    const { props, state } = this;

    return (
      <DropdownModal
        {...props}
        {...state}
        shouldShowModal={this.state.shouldShowModal}
        onChangeText={this.onChangeText}
        onSelectItem={this.onSelectItem}
      />
    );
  }
}
