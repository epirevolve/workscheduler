import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import SkillForm from '../components/SkillForm';

const mapStateToProps = (state) => ({
    skill: state.skillDialog,
});

const mapDispatchToProps = (dispatch) => ({
    changeName: (e) => dispatch(actions.changeName(e.target.value)),
    changeScore: (e) => dispatch(actions.changeScore(e.target.value)),
    changeIsCertified: (e) => dispatch(actions.changeIsCertified(e.target.checked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillForm);