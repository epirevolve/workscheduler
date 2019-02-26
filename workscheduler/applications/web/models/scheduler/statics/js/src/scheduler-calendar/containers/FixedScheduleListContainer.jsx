import React from 'react';
import { connect } from 'react-redux';

import FixedScheduleList from '../components/FixedScheduleList';

import { changeTitle } from '../actions';
import { changeDate } from '../actions';
import { changeAtFrom } from '../actions';
import { changeAtTo } from '../actions';
import { changeParticipants } from '../actions';
import { removeFixedSchedule } from '../actions';

const mapStateToProps = (state) => ({
    fixedSchedules: state.monthYearSetting.fixedSchedules
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => {},
    handleRemove: () => {},
    onTitleChange: (e) => {},
    onDateChange: (date) => {},
    onAtFromChange: (e) => {},
    onAtToChange: (e) => {},
    onParticipantChange: (e) => {}
});

export default connect(mapStateToProps, mapDispatchToProps)(FixedScheduleList);