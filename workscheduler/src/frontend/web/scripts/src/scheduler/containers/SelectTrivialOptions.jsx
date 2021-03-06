import React from 'react';
import { connect } from 'react-redux';

import TrivialOptions from '../components/TrivialOptions';

import { changeCertifiedSkill, changeNotCertifiedSkill } from '../actions';

const mapStateToProps = (state) => ({
    scheduler: state.scheduler
});

const mapDispatchToProps = (dispatch) => ({
    changeCertifiedSkill: (e) => dispatch(changeCertifiedSkill(e.target.value)),
    changeNotCertifiedSkill: (e) => dispatch(changeNotCertifiedSkill(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrivialOptions);