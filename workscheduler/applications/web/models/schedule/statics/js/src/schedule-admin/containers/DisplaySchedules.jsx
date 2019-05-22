import React from 'react'
import { connect } from 'react-redux'

import Schedules from '../components/Schedules';

import { fetchSchedules } from '../../schedule/actions';
import { changeWorkCategory } from '../actions';

const mapStateToProps = (state) => ({
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules,
    totals: state.schedules.totals,
    affiliation: state.schedules.affiliation,
    scheduleOf: state.schedules.scheduleOf
})

const mapDispatchToProps = (dispatch) => ({
    onLoad: (affiliation, scheduleOf) => {
        fetchSchedules(affiliation, scheduleOf)
            .then(action => dispatch(action))
    },
    onCategoryChange: (workCategories) => (operator) => (day, daySetting) => (e) => {
        const category = e.target.value;
        dispatch(changeWorkCategory(operator, day, daySetting, category, workCategories))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);