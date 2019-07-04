import React from 'react';
import { connect } from 'react-redux';

import Calendar from '../components/Calendar';

import { openDialogToAppend, openDialogToUpdate } from '../actions';

const mapStateToProps = (state) => ({
    calendar: state.calendar
});

const mapDispatchToProps = (dispatch) => ({
    append: (atFrom, atTo) => dispatch(openDialogToAppend(atFrom, atTo)),
    edit: (request) => dispatch(openDialogToUpdate(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);