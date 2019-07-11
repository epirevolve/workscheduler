import React from 'react';
import propTypes from 'prop-types';

import TextField from "@material-ui/core/TextField";

const VacationForm = ({
        vacation, changeTitle, changeDaysCount,
        changeStartFrom, changeEndOn
    }) => (
    <>
       <TextField autoFocus margin="dense" label="title" fullWidth required
            onChange={changeTitle} value={vacation.title} />
        <TextField margin="dense" label="days count" fullWidth type="number"
            onChange={changeDaysCount} value={vacation.daysCount} />
        <TextField margin="dense" label="from" fullWidth type="date" required
            onChange={changeStartFrom} value={vacation.onFrom} />
        <TextField margin="dense" label="to" fullWidth type="date" required
            onChange={changeEndOn} value={vacation.onTo} />
    </>
);

VacationForm.propTypes = {
    vacation: propTypes.object,
    changeTitle: propTypes.func.isRequired,
    changeDaysCount: propTypes.func.isRequired,
    changeStartFrom: propTypes.func.isRequired,
    changeEndOn: propTypes.func.isRequired
};

export default VacationForm;