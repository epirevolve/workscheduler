import React from 'react';
import { connect } from 'react-redux';

import WorkCategoryList from '../components/WorkCategoryList';

import { addWorkCategory, removeWorkCategory, changeWorkCategoryTitle,
    changeWorkCategoryAtFrom, changeWorkCategoryAtTo, changeWorkCategoryWeekDayRequire, changeWorkCategoryHolidayRequire,
    changeWorkCategoryRestDays, changeWorkCategoryMaxTimes, changeWorkCategoryWeekDayOperator,
    changeWorkCategoryHolidayOperator, changeWorkCategoryEssentialSkill, changeWorkCategoryExclusiveOperator,
    changeWorkCategoryImpossibleOperator } from '../actions';

const mapStateToProps = (state) => ({
    workCategories: state.scheduler.workCategories
});

const mapDispatchToProps = (dispatch) => ({
    append: async () => {dispatch(await addWorkCategory());},
    remove: (id) => () => {dispatch(removeWorkCategory(id));},
    changeTitle: (id) => (e) => dispatch(changeWorkCategoryTitle(id, e.target.value)),
    changeAtFrom: (id) => (e) => dispatch(changeWorkCategoryAtFrom(id, e.target.value)),
    changeAtTo: (id) => (e) => dispatch(changeWorkCategoryAtTo(id, e.target.value)),
    changeWeekdayRequire: (id) => (e) => dispatch(changeWorkCategoryWeekDayRequire(id, e.target.value)),
    changeHolidayRequire: (id) => (e) => dispatch(changeWorkCategoryHolidayRequire(id, e.target.value)),
    changeRestDay: (id) => (e) => dispatch(changeWorkCategoryRestDays(id, e.target.value)),
    changeMaxTimes: (id) => (e) => dispatch(changeWorkCategoryMaxTimes(id, e.target.value)),
    changeWeekdayOperators: (id, data) => dispatch(changeWorkCategoryWeekDayOperator(id, data)),
    changeHolidayOperators: (id, data) => dispatch(changeWorkCategoryHolidayOperator(id, data)),
    changeEssentialSkills: (id, data) => dispatch(changeWorkCategoryEssentialSkill(id, data)),
    changeExclusiveOperators: (id, data) => dispatch(changeWorkCategoryExclusiveOperator(id, data)),
    changeImpossibleOperators: (id, data) => dispatch(changeWorkCategoryImpossibleOperator(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkCategoryList);