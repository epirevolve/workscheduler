import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import PopupCheckList from './PopupCheckList';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { ml2, mb3 } from 'margin';
import { pr2 } from 'padding';

const dataset = document.querySelector('script[src*="schedulerBasic"]').dataset;
const operators = JSON.parse(dataset.operators);
const skills = JSON.parse(dataset.skills);

const workCategory = ({ workCategory, handleRemove, onTitleChange,
    onAtFromChange, onAtToChange, onWeekDayRequireChange,
    onWeekDayMaxChange, onHolidayRequireChange, onHolidayMaxChange,
    onRestDaysChange, onMaxTimesChange, onWeekDayOperatorChange,
    onHolidayOperatorChange, onEssentialSkillChange, onExclusiveOperatorChange,
    onImpossibleOperatorChange }) => (
    <Card>
        <CardContent>
            <TextField autoFocus label="title" required value={workCategory.title}
                onChange={onTitleChange(workCategory.id)} margin='normal' />
            <Grid container css={mb3}>
                <Grid item sm={6} xs={12} css={pr2}>
                    <TextField type="time" label="from" required onChange={onAtFromChange(workCategory.id)}
                        value={workCategory.atFrom ? moment(workCategory.atFrom, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField type="time" label="to" required onChange={onAtToChange(workCategory.id)}
                        value={workCategory.atTo ? moment(workCategory.atTo, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                </Grid>
            </Grid>
            <Grid container css={mb3}>
                <Grid item sm={6} xs={12} css={pr2}>
                    <TextField type="number" label="week day require" required value={workCategory.weekDayRequire}
                        onChange={onWeekDayRequireChange(workCategory.id)} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField type="number" label="week day max" required value={workCategory.weekDayMax}
                        onChange={onWeekDayMaxChange(workCategory.id)} />
                </Grid>
            </Grid>
            <Grid container css={mb3}>
                <Grid item sm={6} xs={12} css={pr2}>
                    <TextField type="number" label="holiday require" required value={workCategory.holidayRequire}
                        onChange={onHolidayRequireChange(workCategory.id)} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField type="number" label="holiday max" required value={workCategory.holidayMax}
                        onChange={onHolidayMaxChange(workCategory.id)} />
                </Grid>
            </Grid>
            <Grid container css={mb3}>
                <Grid item sm={6} xs={12} css={pr2}>
                    <TextField type="number" label="day offs" required value={workCategory.dayOffs}
                        onChange={onRestDaysChange(workCategory.id)} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField type="number" label="max times" required value={workCategory.maxTimes}
                        onChange={onMaxTimesChange(workCategory.id)} placeholder="0 means unlimited" />
                </Grid>
            </Grid>
            <PopupCheckList name={'WeekDay Operators'} targets={operators.map((x) => ({id: x.id, name: x.user.name, obj: x}))}
                current={workCategory.weekDayOperators.map((x) => ({id: x.id, name: x.user.name}))}
                onSelectChange={(x) => onWeekDayOperatorChange(workCategory.id, x)} />
            <PopupCheckList name={'Holiday Operators'} targets={operators.map((x) => ({id: x.id, name: x.user.name, obj: x}))}
                current={workCategory.holidayOperators.map((x) => ({id: x.id, name: x.user.name}))}
                onSelectChange={(x) => onHolidayOperatorChange(workCategory.id, x)} />
            <PopupCheckList name={'Essential Skills'} targets={skills.map((x) => ({id: x.id, name: x.name, obj: x}))}
                current={workCategory.essentialSkills.map((x) => ({id: x.id, name: x.name}))}
                onSelectChange={(x) => onEssentialSkillChange(workCategory.id, x)} />
            <PopupCheckList name={'Exclusive Operators'} targets={operators.map((x) => ({id: x.id, name: x.user.name, obj: x}))}
                current={workCategory.exclusiveOperators.map((x) => ({id: x.id, name: x.user.name}))}
                onSelectChange={(x) => onExclusiveOperatorChange(workCategory.id, x)} />
            <PopupCheckList name={'Impossible Operators'} targets={operators.map((x) => ({id: x.id, name: x.user.name, obj: x}))}
                current={workCategory.impossibleOperators.map((x) => ({id: x.id, name: x.user.name}))}
                onSelectChange={(x) => onImpossibleOperatorChange(workCategory.id, x)} />
        </CardContent>
        <CardActions css={ml2}>
            <Button onClick={handleRemove(workCategory.id)} variant="outlined" color="secondary">
                Remove
            </Button>
        </CardActions>
    </Card>
);

workCategory.propTypes = {
    workCategories: PropTypes.array.isRequired,
    handleAppend: PropTypes.func.isRequired,
    workCategory: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onAtFromChange: PropTypes.func.isRequired,
    onAtToChange: PropTypes.func.isRequired,
    onWeekDayRequireChange: PropTypes.func.isRequired,
    onWeekDayMaxChange: PropTypes.func.isRequired,
    onHolidayRequireChange: PropTypes.func.isRequired,
    onHolidayMaxChange: PropTypes.func.isRequired,
    onRestDaysChange: PropTypes.func.isRequired,
    onMaxTimesChange: PropTypes.func.isRequired,
    onWeekDayOperatorChange: PropTypes.func.isRequired,
    onHolidayOperatorChange: PropTypes.func.isRequired,
    onEssentialSkillChange: PropTypes.func.isRequired,
    onExclusiveOperatorChange: PropTypes.func.isRequired,
    onImpossibleOperatorChange: PropTypes.func.isRequired,
};

export default workCategory;