import React from 'react';
import { connect } from 'react-redux';

import OperatorList from '../components/OperatorList';

import { openDialogToUpdate } from '../actions';

const mapStateToProps = (state) => ({
    operators: state.operators
});

const mapDispatchToProps = (dispatch) => ({
    edit: (operator) => dispatch(openDialogToUpdate(operator))
});

export default connect(mapStateToProps, mapDispatchToProps)(OperatorList);