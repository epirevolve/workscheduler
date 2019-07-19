import React from 'react';

import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index';
import 'rc-time-picker/assets/index';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
import { minDate, maxDate } from '../embeddedData';

const isValidRange = (v) => v && v[0] && v[1];

const disabledDate = (current) => {
    if (!current) return false;
    return current.valueOf() < minDate.valueOf() || maxDate.valueOf() < current.valueOf();
};

const requestForm = ({
    request, changeTitle, changeNote, changeDate
    }) => {
    const timePickerElement = <TimePickerPanel defaultValue={moment('00:00', 'HH:mm')}
        showSecond={false} minuteStep={15} />;
    const calendar = <RangeCalendar showDateInput={false} disabledDate={disabledDate}
        timePicker={timePickerElement} showToday={false} format='YYYY-MM-DD HH:mm' />;
    return (
        <>
            <TextField autoFocus margin="dense" label="title" fullWidth
                onChange={changeTitle} value={request.title} />
            <TextField autoFocus margin="dense" label="note" fullWidth
                onChange={changeNote} value={request.note} />
            <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                value={[ request.atFrom, request.atTo ]} onChange={changeDate}>
                {({ value }) => {
                    const formatDate = (x) => x.format('YYYY-MM-DD HH:mm');
                    const disp = isValidRange(value) && `${formatDate(value[0])} - ${formatDate(value[1])}` || '';
                    return (
                        <TextField autoFocus margin="dense" label="date"
                            fullWidth InputProps={{ readOnly: true, tabIndex: -1 }} value={disp} />
                    );}}
            </DatePicker>
        </>
    );
};

requestForm.propTypes = {
    request: propTypes.object.isRequired,
    changeTitle: propTypes.func.isRequired,
    changeNote: propTypes.func.isRequired,
    changeDate: propTypes.func.isRequired,
};

export default requestForm;