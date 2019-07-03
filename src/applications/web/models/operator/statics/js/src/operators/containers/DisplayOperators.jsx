import React from 'react';
import { connect } from 'react-redux';

import Operators from '../components/Operators';

import { openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    operators: state.operators
});

const mapDispatchToProps = (dispatch) => ({
    fetchOperators: () => {},
    edit: (operator) => dispatch(openDialogToEdit(operator))
});

export default connect(mapStateToProps, mapDispatchToProps)(Operators);