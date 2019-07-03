import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    operator: state.operatorDialog
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    save: (operator) => dispatch(actions.startSaveOperator(operator))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);