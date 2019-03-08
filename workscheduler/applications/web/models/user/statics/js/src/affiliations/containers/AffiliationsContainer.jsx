import React from 'react'
import { connect } from 'react-redux'

import Affiliations from '../components/Affiliations';

import { openDialogToAppend } from '../actions';
import { openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    affiliations: state.affiliations
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => dispatch(openDialogToAppend()),
    handleEdit: (user) => dispatch(openDialogToEdit(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Affiliations);