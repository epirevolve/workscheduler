import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

import * as actions from '../actions';

import RequestDialog from '../components/RequestDialog';

const dataset = document.querySelector('script[src*="request"]').dataset;
const urlAdd = dataset.urlAddRequest;
const urlUpdate = dataset.urlUpdateRequest;
const scheduleOf = new Date(dataset.scheduleOf).toYearMonthFormatString();

const mapStateToProps = (state) => ({
    requestDialog: state.requestDialog
});

const mapDispatchToProps = (dispatch) => ({
    onTitleChange: (e) => dispatch(actions.changeTitle(e.target.value)),
    onNoteChange: (e) => dispatch(actions.changeNote(e.target.value)),
    onDateChange: (dates) => dispatch(actions.changeDate(dates)),
    handleClose: () => dispatch(actions.closeDialog()),
    handleRemove: (id) => {
        requestAgent
            .delete(urlUpdate.replace('request_id', id))
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(actions.removeRequest(id));
                dispatch(showSnackbar('we are succeeded to delete your request'));
            });
        dispatch(actions.closeDialog());
    },
    handleSave: (requestDialog) => {
        const data = {...requestDialog,
            atFrom: requestDialog.atFrom.toDate().toDateTimeFormatString(),
            atTo: requestDialog.atTo.toDate().toDateTimeFormatString()};

        requestAgent
            .post(data.id ? urlUpdate.replace('request_id', data.id) : urlAdd)
            .send(data)
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                if (data.id) {
                    dispatch(actions.removeRequest(data.id));
                    dispatch(actions.addRequest(scheduleOf, JSON.parse(res.text)));
                }
                else
                    dispatch(actions.addRequest(scheduleOf, JSON.parse(res.text)));
                dispatch(showSnackbar('we are succeeded to store your request'));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with appending request...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });

        dispatch(actions.closeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestDialog);