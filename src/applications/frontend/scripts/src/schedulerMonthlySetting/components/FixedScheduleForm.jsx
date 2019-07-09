import React from 'react';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index';
import moment from 'moment';

import Participants from './Participants';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { my3, mr4 } from "margin";

const timeCss = css({
    width: '6rem'
});

const isValidRange = (v) => v && v[0] && v[1];

const fixedScheduleForm = ({
        fixedSchedule, changeTitle, changeDate,
        changeAtFrom, changeAtTo, changeParticipant
    }) => {
        const calendar = <RangeCalendar showDateInput={false} showToday={false} format='YYYY-MM-DD' />;
        return (
            <>
                <TextField autoFocus label="title" required value={fixedSchedule.title}
                    onChange={changeTitle(fixedSchedule.id)} />
                <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                    value={[ moment(fixedSchedule.onFrom), moment(fixedSchedule.onTo) ]}
                        onChange={changeDate(fixedSchedule.id)}>
                    { ({ value }) => {
                        const formatDate = (x) => x.format('YYYY-MM-DD');
                        const disp = isValidRange(value) && `${formatDate(value[0])} - ${formatDate(value[1])}` || '';
                        return (
                            <TextField margin="dense" label="date"
                                InputProps={{ readOnly: true, tabIndex: -1 }} value={disp} />
                            );}}
                </DatePicker>
                <div css={my3}>
                    <TextField label="start time" type="time" css={css(mr4, timeCss)} onChange={changeAtFrom(fixedSchedule.id)}
                        value={fixedSchedule.atFrom ? moment(fixedSchedule.atFrom, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                    <TextField label="end time" type="time" css={timeCss} onChange={changeAtTo(fixedSchedule.id)}
                        value={fixedSchedule.atTo ? moment(fixedSchedule.atTo, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                </div>
                <Participants fixedSchedule={fixedSchedule} changeParticipant={changeParticipant} />
            </>
        );
};

fixedScheduleForm.propTypes = {
    fixedSchedule: propTypes.object,
    remove: propTypes.func.isRequired,
    changeTitle: propTypes.func.isRequired,
    changeDate: propTypes.func.isRequired,
    changeAtFrom: propTypes.func.isRequired,
    changeAtTo: propTypes.func.isRequired,
    changeParticipant: propTypes.func.isRequired,
};

export default fixedScheduleForm;
