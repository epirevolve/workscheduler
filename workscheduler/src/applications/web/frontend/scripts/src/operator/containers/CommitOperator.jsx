import React from 'react';
import { connect } from 'react-redux';

import { startUpdateOperator } from "../actions";

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    operator: state.operator
});

const mapDispatchToProps = (dispatch) => ({
    save: (operator) => dispatch(startUpdateOperator(operator)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);