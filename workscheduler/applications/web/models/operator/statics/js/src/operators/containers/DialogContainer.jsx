import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { editOperator } from '../actions';
import { closeDialog } from '../actions';
import { changeSkill } from '../actions';
import { changeOjt } from '../actions';

import OperatorDialog from '../components/OperatorDialog';

const $script = $('script[src*="operators"]');
const url = $script.data('url');

const mapStateToProps = (state) => ({
    operatorDialog: state.operatorDialog
})

const mapDispatchToProps = (dispatch) => ({
    onSkillChange: (skill) => dispatch(changeSkill(skill)),
    onOjtChange: (e) => dispatch(changeOjt(e.target.value)),
    handleClose: () => dispatch(closeDialog()),
    handleSave: (operatorDialog) => {
        requestAgent
            .post(url.replace('operator_id', operatorDialog.id))
            .send(operatorDialog)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('operator was successfully stored.', 'alert-info');
                dispatch(closeDialog());
                dispatch(editOperator(JSON.parse(res.text)));
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with appending skill...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OperatorDialog)