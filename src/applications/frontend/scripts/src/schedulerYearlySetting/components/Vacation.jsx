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

const isValidRange = (v) => v && v[0] && v[1];

const vacation = ({ vacation, onTitleChange, onDateChange,
    onDaysChange, handleRemove }) => {

    const calendar = <RangeCalendar showDateInput={false} showToday={false} format='YYYY-MM-DD' />;

    return (
        <Card>
            <CardContent>
                <TextField autoFocus label="title" required value={vacation.title}
                    onChange={onTitleChange(vacation.id)} className="mb-3" />
                <DatePicker animation="slide-up" calendar={calendar} style={{ zIndex: 1500 }}
                    value={[moment(vacation.onFrom), moment(vacation.onTo)]}
                        onChange={onDateChange(vacation.id)}>
                    { ({ value }) => {
                        const formatDate = (x) => x.format('YYYY-MM-DD');
                        const disp = isValidRange(value) && `${formatDate(value[0])} - ${formatDate(value[1])}` || '';
                        return (
                            <TextField margin="dense" label="date"
                                InputProps={{ readOnly: true, tabIndex: -1 }} value={disp} />
                            );}}
                </DatePicker>
                <TextField type="number" label="number of days" required value={vacation.days}
                    onChange={onDaysChange(vacation.id)} />
            </CardContent>
            <CardActions className="ml-2">
                <Button onClick={() => handleRemove(vacation.id)} variant="outlined" color="secondary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default vacation;