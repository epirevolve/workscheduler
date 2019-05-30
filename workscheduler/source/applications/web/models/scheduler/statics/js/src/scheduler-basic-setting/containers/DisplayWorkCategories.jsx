import React from 'react';
import { connect } from 'react-redux';

import WorkCategoryList from '../components/WorkCategoryList';

import { addWorkCategory } from '../actions';
import { removeWorkCategory } from '../actions';
import { changeWorkCategoryTitle } from '../actions';
import { changeWorkCategoryAtFrom } from '../actions';
import { changeWorkCategoryAtTo } from '../actions';
import { changeWorkCategoryWeekDayRequire } from '../actions';
import { changeWorkCategoryWeekDayMax } from '../actions';
import { changeWorkCategoryHolidayRequire } from '../actions';
import { changeWorkCategoryHolidayMax } from '../actions';
import { changeWorkCategoryRestDays } from '../actions';
import { changeWorkCategoryMaxTimes } from '../actions';
import { changeWorkCategoryWeekDayOperator } from '../actions';
import { changeWorkCategoryHolidayOperator } from '../actions';
import { changeWorkCategoryEssentialSkill } from '../actions';
import { changeWorkCategoryExclusiveOperator } from '../actions';
import { changeWorkCategoryImpossibleOperator } from '../actions';

const mapStateToProps = (state) => ({
    workCategories: state.scheduler.workCategories
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => {dispatch(addWorkCategory())},
    handleRemove: (id) => () => {dispatch(removeWorkCategory(id))},
    onTitleChange: (id) => (e) => dispatch(changeWorkCategoryTitle(id, e.target.value)),
    onAtFromChange: (id) => (e) => dispatch(changeWorkCategoryAtFrom(id, e.target.value)),
    onAtToChange: (id) => (e) => dispatch(changeWorkCategoryAtTo(id, e.target.value)),
    onWeekDayRequireChange: (id) => (e) => dispatch(changeWorkCategoryWeekDayRequire(id, e.target.value)),
    onWeekDayMaxChange: (id) => (e) => dispatch(changeWorkCategoryWeekDayMax(id, e.target.value)),
    onHolidayRequireChange: (id) => (e) => dispatch(changeWorkCategoryHolidayRequire(id, e.target.value)),
    onHolidayMaxChange: (id) => (e) => dispatch(changeWorkCategoryHolidayMax(id, e.target.value)),
    onRestDaysChange: (id) => (e) => dispatch(changeWorkCategoryRestDays(id, e.target.value)),
    onMaxTimesChange: (id) => (e) => dispatch(changeWorkCategoryMaxTimes(id, e.target.value)),
    onWeekDayOperatorChange: (id, data) => dispatch(changeWorkCategoryWeekDayOperator(id, data)),
    onHolidayOperatorChange: (id, data) => dispatch(changeWorkCategoryHolidayOperator(id, data)),
    onEssentialSkillChange: (id, data) => dispatch(changeWorkCategoryEssentialSkill(id, data)),
    onExclusiveOperatorChange: (id, data) => dispatch(changeWorkCategoryExclusiveOperator(id, data)),
    onImpossibleOperatorChange: (id, data) => dispatch(changeWorkCategoryImpossibleOperator(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkCategoryList);