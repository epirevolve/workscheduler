import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Operator from '../components/Operator';

import { AlertManager } from 'alert-helper';

import { changeSkill } from '../actions';
import { changeRemainPaidHolidays } from '../actions';

const $script = $('script[src*="operator"]');
const url = $script.data('url');

const mapStateToProps = (state) => ({
    operator: state.operator
});

const mapDispatchToProps = (dispatch) => ({
    handleSave: (operator) => {
        requestAgent
            .post(url)
            .send(operator)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('we succeeded to store your operator info.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with storing your operator info...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
    },
    onSkillChange: (e) => {dispatch(changeSkill(e))},
    onRemainPaidHolidaysChange: (e) => {dispatch(changeRemainPaidHolidays(e.target.value))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Operator);