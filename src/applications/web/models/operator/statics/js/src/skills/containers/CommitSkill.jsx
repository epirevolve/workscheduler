import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';
import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    skill: state.skillDialog,
    isAppend: state.ui.isAppend,
});

const appendStrategy = () => ({
    requestAgent: requestAgent.post('/operator/api/skills'),
    callback: actions.addSkill
});

const updateStrategy = (skill) => ({
    requestAgent: requestAgent.put(`/operator/api/skills/${skill.id}`),
    callback: actions.editSkill
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    remove: (id) => {
        requestAgent
            .delete(`/operator/api/skills/${id}`)
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(showSnackbar('skill was successfully deleted.'));
                dispatch(actions.removeSkill(id));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with deleting skill...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(actions.closeDialog());
    },
    save: (skill, isAppend) => {
        const strategy = isAppend ? appendStrategy() : updateStrategy(skill); 
        strategy.requestAgent
            .send(skill)
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                dispatch(showSnackbar('skill was successfully stored.'));
                dispatch(strategy.callback(JSON.parse(res.text)));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with appending skill...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(actions.closeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);