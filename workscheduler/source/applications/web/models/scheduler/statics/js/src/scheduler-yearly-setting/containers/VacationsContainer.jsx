import React from 'react';
import { connect } from 'react-redux';

import Vacations from '../components/Vacations';

import { addVacation } from '../actions';
import { removeVacation } from '../actions';
import { changeVacationTitle } from '../actions';
import { changeVacationDate } from '../actions';
import { changeVacationDays } from '../actions';

const mapStateToProps = (state) => ({
    vacations: state.yearlySetting.vacations
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => { dispatch(addVacation()) },
    handleRemove: (id) => { dispatch(removeVacation(id)) },
    onTitleChange: (id) => (e) => { dispatch(changeVacationTitle(id, e.target.value)) },
    onDateChange: (id) => (date) => { dispatch(changeVacationDate(id, date)) },
    onDaysChange: (id) => (e) => { dispatch(changeVacationDays(id, e.target.value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Vacations);