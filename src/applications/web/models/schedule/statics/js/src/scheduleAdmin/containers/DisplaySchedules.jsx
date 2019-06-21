import React from 'react';
import { connect } from 'react-redux';

import Schedules from '../components/Schedules';

import { requestSchedules } from '../../common/actions';
import { changeWorkCategory } from '../actions';

const mapStateToProps = (state) => ({
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules,
    workCategories: state.schedules.workCategories,
    availableSigns: state.schedules.availableSigns,
    team: state.teams.team,
    scheduleOf: state.schedules.scheduleOf,
    isLoading: state.ui.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (team, scheduleOf) => {
        dispatch(requestSchedules(team, scheduleOf));
    },
    onCategoryChange: (workCategories, operator) => (day, daySetting) => (e) => {
        const category = e.target.value;
        dispatch(changeWorkCategory(operator, day, daySetting, category, workCategories));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);