import React from 'react';
import { connect } from 'react-redux';

import Skills from '../components/Skills';

import { openDialogToAppend, openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    certifiedSkills: state.skills.filter((x) => x.isCertified),
    notCertifiedSkills: state.skills.filter((x) => !x.isCertified)
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => dispatch(openDialogToAppend()),
    handleEdit: (skill) => dispatch(openDialogToEdit(skill))
});

export default connect(mapStateToProps, mapDispatchToProps)(Skills);