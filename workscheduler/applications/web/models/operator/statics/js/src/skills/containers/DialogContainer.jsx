import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { addSkill } from '../actions';
import { editSkill } from '../actions';
import { removeSkill } from '../actions';
import { closeDialog } from '../actions';
import { changeName } from '../actions';
import { changeScore } from '../actions';
import { changeIsCertified } from '../actions';

import SkillDialog from '../components/SkillDialog';

const dataset = document.querySelector('script[src*="skills"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    skillDialog: state.skillDialog
})

const mapDispatchToProps = (dispatch) => ({
    onNameChange: (e) => dispatch(changeName(e.target.value)),
    onScoreChange: (e) => dispatch(changeScore(e.target.value)),
    onIsCertifiedChanged: (e) => dispatch(changeIsCertified(e.target.checked)),
    handleClose: () => dispatch(closeDialog()),
    handleRemove: (id) => {
        requestAgent
            .delete(`${url}${id}`)
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('skill was successfully deleted.', 'alert-info');
                dispatch(removeSkill(id));
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with deleting skill...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    },
    handleSave: (skillDialog) => {
        requestAgent
            .post(skillDialog.id ? `${url}${skillDialog.id}` : url)
            .send(skillDialog)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('skill was successfully stored.', 'alert-info');
                if (skillDialog.id)
                    dispatch(editSkill(JSON.parse(res.text)));
                else
                    dispatch(addSkill(JSON.parse(res.text)));
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with appending skill...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillDialog)