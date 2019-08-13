import React from 'react';
import { connect } from 'react-redux';

import Skills from '../components/Skills';

import { openDialogToAppend, openDialogToUpdate } from '../actions';

const mapStateToProps = (state) => ({
    certifiedSkills: state.skills.filter((x) => x.isCertified),
    notCertifiedSkills: state.skills.filter((x) => !x.isCertified)
});

const mapDispatchToProps = (dispatch) => ({
    append: async () => dispatch(await openDialogToAppend()),
    edit: (skill) => dispatch(openDialogToUpdate(skill))
});

export default connect(mapStateToProps, mapDispatchToProps)(Skills);