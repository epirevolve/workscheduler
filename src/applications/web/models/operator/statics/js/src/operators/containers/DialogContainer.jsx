import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

import { editOperator, closeDialog, changeSkill, changeOjt } from '../actions';

import OperatorDialog from '../components/OperatorDialog';

const mapStateToProps = (state) => ({
    operatorDialog: state.operatorDialog
});

const mapDispatchToProps = (dispatch) => ({
    onSkillChange: (skill) => dispatch(changeSkill(skill)),
    onOjtChange: (e) => dispatch(changeOjt(e.target.value)),
    handleClose: () => dispatch(closeDialog()),
    handleSave: (operatorDialog) => {
        requestAgent
            .put(`/operator/api/${operatorDialog.id}`)
            .send(operatorDialog)
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                dispatch(showSnackbar('operator was successfully stored.'));
                dispatch(closeDialog());
                dispatch(editOperator(JSON.parse(res.text)));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with appending skill...';
                dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OperatorDialog);