import React from 'react';
import { connect } from 'react-redux';

import Calendar from '../components/Calendar';

import { openDialogToAppend, openDialogToUpdate } from '../actions';
import { showSnackbar } from 'snackbarActions';

const mapStateToProps = (state) => ({
    monthlySetting: state.monthlySetting
});

const mapDispatchToProps = (dispatch) => ({
    append: (day, currentDate) => {
        if (day.requests.length >= 2) {
            dispatch(showSnackbar('cant append more request on this day'));
            return;
        }
        dispatch(openDialogToAppend(new Date(`${currentDate}T09:30`), new Date(`${currentDate}T18:00`)));
    },
    edit: (request) => dispatch(openDialogToUpdate(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);