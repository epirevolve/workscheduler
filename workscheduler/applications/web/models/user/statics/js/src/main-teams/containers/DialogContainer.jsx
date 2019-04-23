import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { addMainTeam } from '../actions';
import { editMainTeam } from '../actions';
import { removeMainTeam } from '../actions';
import { closeDialog } from '../actions';
import { changeName } from '../actions';
import { changeNote } from '../actions';

import MainTeamDialog from '../components/MainTeamDialog';

const dataset = document.querySelector('script[src*="main-teams"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    mainTeamDialog: state.mainTeamDialog
})

const mapDispatchToProps = (dispatch) => ({
    onNameChange: (e) => dispatch(changeName(e.target.value)),
    onNoteChange: (e) => dispatch(changeNote(e.target.value)),
    handleClose: () => dispatch(closeDialog()),
    handleRemove: (id) => {
        requestAgent
            .delete(`${url}${id}`)
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('main team was successfully remove.', 'alert-info');
                dispatch(removeMainTeam(id));
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with removing main team...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    },
    handleSave: (dialog) => {
        requestAgent
            .post(dialog.id ? `${url}${dialog.id}` : url)
            .send(dialog)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('affiliation was successfully stored.', 'alert-info');
                if (dialog.id)
                    dispatch(editMainTeam(JSON.parse(res.text)));
                else
                    dispatch(addMainTeam(JSON.parse(res.text)));
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with appending main team...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainTeamDialog)