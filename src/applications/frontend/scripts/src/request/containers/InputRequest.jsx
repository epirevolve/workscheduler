import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import RequestForm from '../components/RequestForm';

const mapStateToProps = (state) => ({
    requestDialog: state.requestDialog
});

const mapDispatchToProps = (dispatch) => ({
    changeTitle: (e) => dispatch(actions.changeTitle(e.target.value)),
    changeNote: (e) => dispatch(actions.changeNote(e.target.value)),
    changeDate: (dates) => dispatch(actions.changeDate(dates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);