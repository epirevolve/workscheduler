import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Operator from '../components/Operator';

import { showSnackbar } from 'snackbarActions';

import { changeSkill, changeRemainPaidHolidays } from '../actions';

const dataset = document.querySelector('script[src*="operator"]').dataset;
const url = dataset.url;

const mapStateToProps = (state) => ({
    operator: state.operator
});

const mapDispatchToProps = (dispatch) => ({
    handleSave: (operator) => {
        requestAgent
            .post(url)
            .send(operator)
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                dispatch(showSnackbar('we succeeded to store your operator info.'));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with storing your operator info...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
    },
    onSkillChange: (e) => dispatch(changeSkill(e)),
    onRemainPaidHolidaysChange: (e) => dispatch(changeRemainPaidHolidays(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Operator);