import React from 'react';
import propTypes from 'prop-types';

import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index';

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mb3, ml2 } from "margin";

const isValidRange = (v) => v && v[0] && v[1];

const vacation = ({ vacation, changeTitle, changeDate,
    changeDays, remove }) => {
    const calendar = <RangeCalendar showDateInput={false} showToday={false} format='YYYY-MM-DD' />;

    return (
        <Card>
            <CardContent>
                <TextField autoFocus label="title" required value={vacation.title}
                    onChange={changeTitle(vacation.id)} css={mb3} />
                <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                    value={[ moment(vacation.onFrom), moment(vacation.onTo) ]}
                        onChange={changeDate(vacation.id)}>
                    { ({ value }) => {
                        const formatDate = (x) => x.format('YYYY-MM-DD');
                        const disp = isValidRange(value) && `${formatDate(value[0])} - ${formatDate(value[1])}` || '';
                        return (
                            <TextField margin="dense" label="date"
                                InputProps={{ readOnly: true, tabIndex: -1 }} value={disp} />
                            );}}
                </DatePicker>
                <TextField type="number" label="number of days" required value={vacation.days}
                    onChange={changeDays(vacation.id)} />
            </CardContent>
            <CardActions css={ml2}>
                <Button onClick={() => remove(vacation.id)} variant="outlined" color="secondary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

vacation.propTypes = {
    vacation: propTypes.object,
    changeTitle: propTypes.func.isRequired,
    changeDate: propTypes.func.isRequired,
    changeDays: propTypes.func.isRequired,
    remove: propTypes.func.isRequired,
};

export default vacation;