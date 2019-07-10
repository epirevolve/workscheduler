import React from 'react';
import { connect } from 'react-redux';

import Schedules from '../components/Schedules';

import { changeWorkCategory } from '../actions';

const mapStateToProps = (state) => ({
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules,
    workCategories: state.schedules.workCategories,
    availableSigns: state.schedules.availableSigns,
});

const mapDispatchToProps = (dispatch) => ({
    changeCategory: (workCategories, operator) => (day, daySetting) => (e) => {
        const category = e.target.value;
        dispatch(changeWorkCategory(operator, day, daySetting, category, workCategories));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);