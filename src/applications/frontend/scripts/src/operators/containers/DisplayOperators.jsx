import React from 'react';
import { connect } from 'react-redux';

import Operators from '../components/Operators';

import { openDialogToUpdate } from '../actions';

const mapStateToProps = (state) => ({
    operators: state.operators
});

const mapDispatchToProps = (dispatch) => ({
    fetchOperators: () => {},
    edit: (operator) => dispatch(openDialogToUpdate(operator))
});

export default connect(mapStateToProps, mapDispatchToProps)(Operators);