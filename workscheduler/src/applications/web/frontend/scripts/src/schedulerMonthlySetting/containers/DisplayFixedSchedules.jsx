import React from 'react';
import { connect } from 'react-redux';

import FixedScheduleList from '../components/FixedScheduleList';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    fixedSchedules: state.monthlySetting.days ? Object.values(state.monthlySetting.days.map((x) => x.fixedSchedules).flat().reduce((map, x) => {map[x.id] = x; return map;}, {})) : [],
    scheduleOf: `${state.monthlySetting.year}-${state.monthlySetting.month}`
});

const mapDispatchToProps = (dispatch) => ({
    append: async (scheduleOf) => dispatch(await actions.openDialogToAppend(scheduleOf)),
    edit:  (fixedSchedule) => dispatch(actions.openDialogToUpdate(fixedSchedule)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FixedScheduleList);