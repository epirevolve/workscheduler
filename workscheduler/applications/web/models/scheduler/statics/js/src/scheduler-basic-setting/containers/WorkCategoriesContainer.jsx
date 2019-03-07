import React from 'react';
import { connect } from 'react-redux';

import WorkCategories from '../components/WorkCategories';

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
import { changeWorkCategoryEssentialSkill } from '../actions';
import { changeWorkCategoryEssentialOperator } from '../actions';
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
    onEssentialSkillChange: (id, data) => dispatch(changeWorkCategoryEssentialSkill(id, data)),
    onEssentialOperatorChange: (id, data) => dispatch(changeWorkCategoryEssentialOperator(id, data)),
    onImpossibleOperatorChange: (id, data) => dispatch(changeWorkCategoryImpossibleOperator(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkCategories);