import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import FixedScheduleForm from '../components/FixedScheduleForm';

const mapStateToProps = (state) => ({
    fixedSchedule: state.fixedScheduleDialog,
});

const mapDispatchToProps = (dispatch) => ({
    changeTitle: (e) => { dispatch(actions.changeTitle(e.target.value)); },
    changeDate: (date) => { dispatch(actions.changeDate(date)); },
    changeAtFrom: (e) => { dispatch(actions.changeAtFrom(e.target.value)); },
    changeAtTo: (e) => { dispatch(actions.changeAtTo(e.target.value)); },
    changeParticipant: (data) => { dispatch(actions.changeParticipant(data)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(FixedScheduleForm);