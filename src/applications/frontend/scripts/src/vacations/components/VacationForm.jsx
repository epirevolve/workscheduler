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
        <TextField margin="dense" label="note" fullWidth
            onChange={changeDaysCount} value={vacation.daysCount} />
        <TextField margin="dense" label="note" fullWidth
            onChange={changeStartFrom} value={vacation.startFrom} />
        <TextField margin="dense" label="note" fullWidth
            onChange={changeEndOn} value={vacation.endOn} />
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