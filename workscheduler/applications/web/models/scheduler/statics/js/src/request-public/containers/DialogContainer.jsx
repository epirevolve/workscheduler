import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { addRequest } from '../actions';
import { editRequest } from '../actions';
import { closeDialog } from '../actions';
import { changeTitle } from '../actions';
import { changeNote } from '../actions';
import { changeDate } from '../actions';

import RequestDialog from '../components/RequestDialog';

const $script = $('script[src*="request-public"]');

const holidays = $script.data('holidays');
const paidHolidays = $script.data('paidHolidays');
const urlAdd = $script.data('urlAddRequest');
const urlUpdate = $script.data('urlUpdateRequest');
const scheduleOf = new Date($script.data('scheduleOf')).toYearMonthFormatString();

const mapStateToProps = (state) => ({
    requestDialog: state.requestDialog
})

const mapDispatchToProps = (dispatch) => ({
    onTitleChange: (e) => dispatch(changeTitle(e.target.value)),
    onNoteChange: (e) => dispatch(changeNote(e.target.value)),
    onDateChange: (dates) => dispatch(changeDate(dates)),
    handleClose: () => dispatch(closeDialog()),
    handleRemove: (id) => {
        requestAgent
            .delete(urlUpdate.replace('request_id', id))
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                dispatch(closeDialog());
                dispatch(removeRequest(id));
            });
    },
    handleSave: (requestDialog) => {
        const data = {...requestDialog,
            atFrom: requestDialog.atFrom.toDate().toDateTimeFormatString(),
            atTo: requestDialog.atTo.toDate().toDateTimeFormatString()};

        const post = () => {
            requestAgent
                .post(data.id ? urlUpdate.replace('request_id', data.id) : urlAdd)
                .send(data)
                .set('X-CSRFToken', csrfToken)
                .then(res => {
                    dispatch(closeDialog());
                    if (data.id)
                        dispatch(editRequest(scheduleOf, JSON.parse(data)));
                    else
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