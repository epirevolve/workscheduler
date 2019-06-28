import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

import { addRequest, removeRequest, closeDialog, 
    changeTitle, changeNote, changeDate } from '../actions';

import RequestDialog from '../components/RequestDialog';

const dataset = document.querySelector('script[src*="request"]').dataset;
const holidays = JSON.parse(dataset.holidays || 0);
const paidHolidays = JSON.parse(dataset.paidHolidays || 0);
const urlAdd = dataset.urlAddRequest;
const urlUpdate = dataset.urlUpdateRequest;
const scheduleOf = new Date(dataset.scheduleOf).toYearMonthFormatString();

const mapStateToProps = (state) => ({
    requestDialog: state.requestDialog
});

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
            .then(() => {
                dispatch(removeRequest(id));
                dispatch(showSnackbar('we are succeeded to delete your request'));
            });
        dispatch(closeDialog());
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
					dispatch(removeRequest(data.id));
					dispatch(addRequest(scheduleOf, JSON.parse(res.text)));
				}
				else
					dispatch(addRequest(scheduleOf, JSON.parse(res.text)));
				dispatch(showSnackbar('we are succeeded to store your request'));
			})
			.catch((err) => {
				const res = JSON.parse(err.response.text);
				const message = res.errorMessage || 'we have some trouble with appending request...';
				dispatch(showSnackbar(`Oops, Sorry... ${message}`));
			});

        dispatch(closeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestDialog);