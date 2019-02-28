import React from 'react';
import { connect } from 'react-redux';

import FixedScheduleList from '../components/FixedScheduleList';

import { changeFixedScheduleTitle } from '../actions';
import { changeFixedScheduleDate } from '../actions';
import { changeFixedScheduleAtFrom } from '../actions';
import { changeFixedScheduleAtTo } from '../actions';
import { changeFixedScheduleParticipant } from '../actions';
import { addFixedSchedule } from '../actions';
import { removeFixedSchedule } from '../actions';

const mapStateToProps = (state) => ({
    fixedSchedules: state.monthlySetting.fixedSchedules
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => {dispatch(addFixedSchedule())},
    handleRemove: (id) => () => {dispatch(removeFixedSchedule(id))},
    onTitleChange: (id) => (e) => {dispatch(changeFixedScheduleTitle(id, e.target.value))},
    onDateChange: (id) => (date) => {dispatch(changeFixedScheduleDate(id, date))},
    onAtFromChange: (id) => (e) => {dispatch(changeFixedScheduleAtFrom(id, e.target.value))},
    onAtToChange: (id) => (e) => {dispatch(changeFixedScheduleAtTo(id, e.target.value))},
    onParticipantChange: (id) => (e) => {dispatch(changeFixedScheduleParticipant(id, e))}
});

export default connect(mapStateToProps, mapDispatchToProps)(FixedScheduleList);