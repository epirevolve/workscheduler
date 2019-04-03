import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { addRequest } from '../actions';
import { removeRequest } from '../actions';
import { closeDialog } from '../actions';
import { changeTitle } from '../actions';
import { changeNote } from '../actions';
import { changeDate } from '../actions';

import RequestDialog from '../components/RequestDialog';

const dataset = document.querySelector('script[src*="request-public"]').dataset;
const holidays = JSON.parse(dataset.holidays || 0);
const paidHolidays = JSON.parse(dataset.paidHolidays || 0);
const urlAdd = dataset.urlAddRequest;
const urlUpdate = dataset.urlUpdateRequest;
const scheduleOf = new Date(dataset.scheduleOf).toYearMonthFormatString();

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
                dispatch(removeRequest(id));
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('we are succeeded to delete your request', 'alert-info')
            });
        dispatch(closeDialog());
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
                    if (data.id) {
                        dispatch(removeRequest(data.id));
                        dispatch(addRequest(scheduleOf, JSON.parse(res.text)));
                    }
                    else
                        dispatch(addRequest(scheduleOf, JSON.parse(res.text)));
                    const alertManager = new AlertManager('#alertContainer');
                    alertManager.append('we are succeeded to store your request', 'alert-info')
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

        dispatch(closeDialog());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestDialog)