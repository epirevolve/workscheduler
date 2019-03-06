import React from 'react';
import { connect } from 'react-redux';

import Options from '../components/Options';

import { changeCertifiedSkill } from '../actions';
import { changeNotCertifiedSkill } from '../actions';

const mapStateToProps = (state) => ({
    scheduler: state.scheduler
});

const mapDispatchToProps = (dispatch) => ({
    onCertifiedSkillChange: (e) => dispatch(changeCertifiedSkill(e.target.value)),
    onNotCertifiedSkillChange: (e) => dispatch(changeNotCertifiedSkill(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);