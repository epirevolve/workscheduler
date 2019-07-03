import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import OperatorForm from '../components/OperatorForm';

const mapStateToProps = (state) => ({
    operator: state.operatorDialog
});

const mapDispatchToProps = (dispatch) => ({
    changeSkill: (skill) => dispatch(actions.changeSkill(skill)),
    changeOjt: (e) => dispatch(actions.changeOjt(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OperatorForm);