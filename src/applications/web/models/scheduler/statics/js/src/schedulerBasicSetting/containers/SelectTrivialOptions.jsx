import React from 'react';
import { connect } from 'react-redux';

import TrivialOptions from '../components/TrivialOptions';

import { changeCertifiedSkill, changeNotCertifiedSkill } from '../actions';

const mapStateToProps = (state) => ({
    scheduler: state.scheduler
});

const mapDispatchToProps = (dispatch) => ({
    onCertifiedSkillChange: (e) => dispatch(changeCertifiedSkill(e.target.value)),
    onNotCertifiedSkillChange: (e) => dispatch(changeNotCertifiedSkill(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrivialOptions);