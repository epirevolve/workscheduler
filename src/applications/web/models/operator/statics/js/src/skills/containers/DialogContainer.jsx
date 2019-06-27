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
    skillDialog: state.skillDialog,
    isOpen: state.ui.dialogOpen
});

const mapDispatchToProps = (dispatch) => ({
    changeName: (e) => dispatch(changeName(e.target.value)),
    changeScore: (e) => dispatch(changeScore(e.target.value)),
    changeIsCertified: (e) => dispatch(changeIsCertified(e.target.checked)),
    close: () => dispatch(closeDialog()),
    remove: (id) => {
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
    save: (skillDialog) => {
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