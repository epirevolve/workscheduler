import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

import { addUser, editUser, inactivateUser,
    closeDialog, changeLoginId, changeName,
    changeTeam, changeIsAdmin, changeIsOperator } from '../actions';

import UserDialog from '../components/UserDialog';

const dataset = document.querySelector('script[src*="users"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    userDialog: state.userDialog,
    isOpen: state.ui.dialogOpen
});

const mapDispatchToProps = (dispatch) => ({
    onLoginIdChange: (e) => dispatch(changeLoginId(e.target.value)),
    onNameChange: (e) => dispatch(changeName(e.target.value)),
    onTeamChange: (e) => dispatch(changeTeam(e.target.value)),
    onIsAdminChange: (e) => dispatch(changeIsAdmin(e.target.checked)),
    onIsOperatorChange: (e) => dispatch(changeIsOperator(e.target.checked)),
    handleClose: () => dispatch(closeDialog()),
    handleInactivate: (id) => {
        requestAgent
            .post(`${url}${id}/inactivate`)
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(showSnackbar('user was successfully inactivated.'));
                dispatch(inactivateUser(id));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with inactivate user...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(closeDialog());
    },
    handleResetPassword: (id) => {
        requestAgent
            .post(`${url}${id}/reset-password`)
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(showSnackbar('user password was successfully reset.'));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with resetting password...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(closeDialog());
    },
    handleSave: (userDialog) => {
        requestAgent
            .post(userDialog.id ? `${url}${userDialog.id}` : url)
            .send(userDialog)
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                dispatch(showSnackbar('user was successfully stored.'));
                if (userDialog.id)
                    dispatch(editUser(JSON.parse(res.text)));
                else
                {
                    dispatch(showSnackbar('his/her password is p + his/her login id. Please change it.'));
                    dispatch(addUser(JSON.parse(res.text)));
                }
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with appending user...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
        dispatch(closeDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);