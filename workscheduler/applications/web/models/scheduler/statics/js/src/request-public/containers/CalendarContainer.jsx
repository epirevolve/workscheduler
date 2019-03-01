import React from 'react';
import { connect } from 'react-redux';

import RequestCalendar from '../components/RequestCalendar';

import { openDialogToAppend } from '../actions';
import { openDialogToEdit } from '../actions';

const mapStateToProps = (state) => ({
    requestCalendar: state.requestCalendar
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: (atFrom, atTo) => dispatch(openDialogToAppend(atFrom, atTo)),
    handleEdit: (request) => dispatch(openDialogToEdit(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestCalendar);