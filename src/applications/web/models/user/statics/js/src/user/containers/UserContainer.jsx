import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

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
                dispatch(showSnackbar('Your info is successfully changed.'));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with storing your info...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);