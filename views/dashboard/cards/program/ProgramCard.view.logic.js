import ProgramCard from './ProgramCard.view.js';
import React from 'react';
import { connect } from 'react-redux';

class ProgramCardLogic extends React.Component {
  state = {
    currentProgram: null,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.currentSection !== nextProps.currentSection) {
      this.setState({ currentProgram: nextProps.programList[0] });
    }
  }
  onSelect = item => {
    this.setState({ currentProgram: item });
  };
  onCancel = () => {
    this.setState({ currentProgram: null });
  };
  render() {
    const { props, state } = this;

    return (
      <ProgramCard
        {...props}
        {...state}
        onSelect={this.onSelect}
        onCancel={this.onCancel}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    currentSection: state.section.currentSection,
    programList: state.section.currentSection
      ? state.section.currentSection.programListDropDown
      : [],
  };
}

export default connect(mapStateToProps, null)(ProgramCardLogic);
