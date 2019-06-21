import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

import { addTeam, editTeam, removeTeam,
    closeDialog, changeName, changeNote } from '../actions';

import TeamDialog from '../components/TeamDialog';

const dataset = document.querySelector('script[src*="teams"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    teamDialog: state.teamDialog
});

const mapDispatchToProps = (dispatch) => ({
    onNameChange: (e) => dispatch(changeName(e.target.value)),
    onNoteChange: (e) => dispatch(changeNote(e.target.value)),
    handleClose: () => dispatch(closeDialog()),
    handleRemove: (id) => {
        requestAgent
            .delete(`${url}${id}`)
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(showSnackbar('team was successfully remove.'));
                dispatch(removeTeam(id));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with removing team...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(closeDialog());
    },
    handleSave: (dialog) => {
        requestAgent
            .post(dialog.id ? `${url}${dialog.id}` : url)
            .send(dialog)
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                dispatch(showSnackbar('team was successfully stored.'));
                if (dialog.id)
                    dispatch(editTeam(JSON.parse(res.text)));
                else
                    dispatch(addTeam(JSON.parse(res.text)));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with appending team...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(closeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDialog);