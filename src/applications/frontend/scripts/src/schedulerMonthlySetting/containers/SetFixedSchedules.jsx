import React from 'react';
import { connect } from 'react-redux';

import FixedScheduleList from '../components/FixedScheduleList';

import { addFixedSchedule, removeFixedSchedule, changeFixedScheduleTitle,
    changeFixedScheduleDate, changeFixedScheduleAtFrom, changeFixedScheduleAtTo,
    changeFixedScheduleParticipant } from '../actions';

const mapStateToProps = (state) => ({
    fixedSchedules: Object.values(state.monthlySetting.days.map((x) => x.fixedSchedules).flat().reduce((map, x) => {map[x.id] = x; return map;}, {}))
});

const mapDispatchToProps = (dispatch) => ({
    append: () => { dispatch(addFixedSchedule()); },
    remove: (id) => () => { dispatch(removeFixedSchedule(id)); },
    changeTitle: (id) => (e) => { dispatch(changeFixedScheduleTitle(id, e.target.value)); },
    changeDate: (id) => (date) => { dispatch(changeFixedScheduleDate(id, date)); },
    changeAtFrom: (id) => (e) => { dispatch(changeFixedScheduleAtFrom(id, e.target.value)); },
    changeAtTo: (id) => (e) => { dispatch(changeFixedScheduleAtTo(id, e.target.value)); },
    changeParticipant: (id, data) => { dispatch(changeFixedScheduleParticipant(id, data)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(FixedScheduleList);