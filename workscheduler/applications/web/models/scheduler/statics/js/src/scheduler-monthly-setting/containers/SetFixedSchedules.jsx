import React from 'react';
import { connect } from 'react-redux';

import FixedScheduleList from '../components/FixedScheduleList';

import { addFixedSchedule } from '../actions';
import { removeFixedSchedule } from '../actions';
import { changeFixedScheduleTitle } from '../actions';
import { changeFixedScheduleDate } from '../actions';
import { changeFixedScheduleAtFrom } from '../actions';
import { changeFixedScheduleAtTo } from '../actions';
import { changeFixedScheduleParticipant } from '../actions';

const mapStateToProps = (state) => ({
    fixedSchedules: Object.values(state.monthlySetting.days.map(x => x.fixedSchedules).flat().reduce((map, x) => {map[x.id] = x; return map;}, {}))
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => { dispatch(addFixedSchedule()) },
    handleRemove: (id) => () => { dispatch(removeFixedSchedule(id)) },
    onTitleChange: (id) => (e) => { dispatch(changeFixedScheduleTitle(id, e.target.value)) },
    onDateChange: (id) => (date) => { dispatch(changeFixedScheduleDate(id, date)) },
    onAtFromChange: (id) => (e) => { dispatch(changeFixedScheduleAtFrom(id, e.target.value)) },
    onAtToChange: (id) => (e) => { dispatch(changeFixedScheduleAtTo(id, e.target.value)) },
    onParticipantChange: (id, data) => { dispatch(changeFixedScheduleParticipant(id, data)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(FixedScheduleList);