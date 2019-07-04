import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import { showSnackbar } from 'snackbarActions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    operator: state.operator
});

const mapDispatchToProps = (dispatch) => ({
    save: (operator) => {
        requestAgent
            .put(`/operator/api/myself/${operator.id}`)
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);