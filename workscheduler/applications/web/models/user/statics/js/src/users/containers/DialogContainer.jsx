import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { addUser } from '../actions';
import { editUser } from '../actions';
import { inactivateUser } from '../actions';
import { closeDialog } from '../actions';
import { changeLoginId } from '../actions';
import { changeName } from '../actions';
import { changeAffiliation } from '../actions';
import { changeIsAdmin } from '../actions';
import { changeIsOperator } from '../actions';

import UserDialog from '../components/UserDialog';

const $script = $('script[src*="users"]');
const url = $script.data('url');

const mapStateToProps = (state) => ({
    userDialog: state.userDialog
})

const mapDispatchToProps = (dispatch) => ({
    onLoginIdChange: (e) => dispatch(changeLoginId(e.target.value)),
    onNameChange: (e) => dispatch(changeName(e.target.value)),
    onAffiliationChange: (e) => dispatch(changeAffiliation(e.target.value)),
    onIsAdminChange: (e) => dispatch(changeIsAdmin(e.target.checked)),
    onIsOperatorChange: (e) => dispatch(changeIsOperator(e.target.checked)),
    handleClose: () => dispatch(closeDialog()),
    handleInactivate: (id) => {
        requestAgent
            .post(`${url}${id}/inactivate`)
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('user was successfully inactivated.', 'alert-info');
                dispatch(inactivateUser(id));
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with inactivate user...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    },
    handleResetPassword: (id) => {
        requestAgent
            .post(`${url}${id}/reset-password`)
            .send()
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('user password was successfully reset.', 'alert-info');
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with resetting password...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    },
    handleSave: (userDialog) => {
        requestAgent
            .post(userDialog.id ? `${url}${userDialog.id}` : url)
            .send(userDialog)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('user was successfully stored.', 'alert-info');
                if (userDialog.id)
                    dispatch(editUser(JSON.parse(res.text)));
                else
                {
                    alertManager.append('his/her password is p + his/her login id. Please change it.', 'alert-info');
                    dispatch(addUser(JSON.parse(res.text)));
                }
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with appending user...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
        dispatch(closeDialog());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog)