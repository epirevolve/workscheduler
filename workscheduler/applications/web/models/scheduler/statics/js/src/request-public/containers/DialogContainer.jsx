import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { addRequest } from '../actions'
import { closeDialog } from '../actions'
import { changeTitle } from '../actions'
import { changeNote } from '../actions'
import { changeDate } from '../actions'

import RequestDialog from '../components/RequestDialog'

const $script = $('script[src*="request-public"]');

const holidays = $script.data('holidays');
const paidHolidays = $script.data('paidHolidays');
const url = $script.data('urlAddRequest');
const scheduleOf = new Date($script.data('scheduleOf')).toYearMonthFormatString();

const mapStateToProps = (state) => ({
    dialog: state.dialog
})

const mapDispatchToProps = (dispatch) => ({
    onTitleChange: (e) => dispatch(changeTitle(e.target.value)),
    onNoteChange: (e) => dispatch(changeNote(e.target.value)),
    onDateChange: (dates) => dispatch(changeDate(dates)),
    handleClose: () => dispatch(closeDialog()),
    handleRemove: (id) => dispatch(removeRequest(id)),
    handleSave: (dialog, callback) => {
        const data = {...dialog,
            atFrom: dialog.atFrom.toDate().toDateTimeFormatString(),
            atTo: dialog.atTo.toDate().toDateTimeFormatString()};

        const post = () => {
            requestAgent
                .post(url)
                .send(data)
                .set('X-CSRFToken', csrfToken)
                .then(res => {
                    dispatch(closeDialog());
                    dispatch(addRequest(scheduleOf, JSON.parse(res.text)));
                })
                .catch(err => {
                    const res = JSON.parse(err.response.text);
                    const alertManager = new AlertManager('#alertContainer');
                    const message = res.errorMessage || 'we have some trouble with appending request...';
                    alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
                });
        }

        if (holidays <= $('.request').length) {
            const message = paidHolidays <= 0 ? '<br><br>and also maybe your paid holidays are empty.' : '';
            showConfirmDialog('No Problem?', `adding more request will decrease your paid holidays.${message}`,
                (value) => {
                    if (!value) return;
                    post();
                });
        }
        else {
            post();
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestDialog)