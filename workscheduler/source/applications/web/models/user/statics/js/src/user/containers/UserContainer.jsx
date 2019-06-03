import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { changePassword, changeName } from '../actions';

import User from '../components/User';

const dataset = document.querySelector('script[src*="user"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    onPasswordChange: (e) => dispatch(changePassword(e.target.value)),
    onNameChange: (e) => dispatch(changeName(e.target.value)),
    handleSave: (user) => {
        requestAgent
            .post(url)
            .send(user)
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('Your info is successfully changed.', 'alert-info');
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with storing your info...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger');
            });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);