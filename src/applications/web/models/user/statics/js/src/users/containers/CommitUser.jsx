import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const dataset = document.querySelector('script[src*="users"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    user: state.userDialog,
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    activate: (id) => {
        requestAgent
            .put(`/user/api/users/${id}/activate`)
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(showSnackbar('user was successfully activated.'));
                dispatch(actions.activateUser(id));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with activate user...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(actions.closeDialog());
    },
    inactivate: (id) => {
        requestAgent
            .put(`/user/api/users/${id}/inactivate`)
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(showSnackbar('user was successfully inactivated.'));
                dispatch(actions.inactivateUser(id));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with inactivate user...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(actions.closeDialog());
    },
    resetPassword: (id) => {
        requestAgent
            .put(`/user/api/users/${id}/reset-password`)
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(showSnackbar('user password was successfully reset.'));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with resetting password...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(actions.closeDialog());
    },
    save: (user) => {
        requestAgent
            .post(user.id ? `${url}${user.id}` : url)
            .send(user)
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                dispatch(showSnackbar('user was successfully stored.'));
                if (user.id)
                    dispatch(actions.editUser(JSON.parse(res.text)));
                else
                {
                    dispatch(showSnackbar('his/her password is p + his/her login id. Please change it.'));
                    dispatch(actions.addUser(JSON.parse(res.text)));
                }
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with appending user...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(actions.closeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);