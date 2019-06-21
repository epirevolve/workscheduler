import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

import { addSkill, editSkill, removeSkill, closeDialog,
    changeName, changeScore, changeIsCertified } from '../actions';

import SkillDialog from '../components/SkillDialog';

const dataset = document.querySelector('script[src*="skills"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    skillDialog: state.skillDialog
});

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
            .then(() => {
                dispatch(showSnackbar('skill was successfully deleted.'));
                dispatch(removeSkill(id));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with deleting skill...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(closeDialog());
    },
    handleSave: (skillDialog) => {
        requestAgent
            .post(skillDialog.id ? `${url}${skillDialog.id}` : url)
            .send(skillDialog)
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                dispatch(showSnackbar('skill was successfully stored.'));
                if (skillDialog.id)
                    dispatch(editSkill(JSON.parse(res.text)));
                else
                    dispatch(addSkill(JSON.parse(res.text)));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with appending skill...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(closeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillDialog);