import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { addAffiliation } from '../actions';
import { editAffiliation } from '../actions';
import { removeAffiliation } from '../actions';
import { closeDialog } from '../actions';
import { changeName } from '../actions';
import { changeNote } from '../actions';

import AffiliationDialog from '../components/AffiliationDialog';

const dataset = document.querySelector('script[src*="affiliations"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    affiliationDialog: state.affiliationDialog
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
                alertManager.append('affiliation was successfully remove.', 'alert-info');
                dispatch(removeAffiliation(id));
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with removing affiliation...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    },
    handleSave: (affiliationDialog) => {
        requestAgent
            .post(affiliationDialog.id ? `${url}${affiliationDialog.id}` : url)
            .send(affiliationDialog)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('affiliation was successfully stored.', 'alert-info');
                if (affiliationDialog.id)
                    dispatch(editAffiliation(JSON.parse(res.text)));
                else
                    dispatch(addAffiliation(JSON.parse(res.text)));
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with appending affiliation...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AffiliationDialog)