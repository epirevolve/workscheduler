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

const workCategory = ({ workCategory, remove, changeTitle,
    changeAtFrom, changeAtTo, changeWeekdayRequire,
    changeWeekdayMax, changeHolidayRequire, changeHolidayMax,
    changeRestDay, changeMaxTimes, changeWeekdayOperators,
    changeHolidayOperators, changeEssentialSkills, changeExclusiveOperators,
    changeImpossibleOperators }) => (
    <Card>
        <CardContent>
            <TextField autoFocus label="title" required value={workCategory.title}
                onChange={changeTitle(workCategory.id)} margin='normal' />
            <Grid container css={mb3}>
                <Grid item sm={6} xs={12} css={pr2}>
                    <TextField type="time" label="from" required onChange={changeAtFrom(workCategory.id)}
                        value={workCategory.atFrom ? moment(workCategory.atFrom, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField type="time" label="to" required onChange={changeAtTo(workCategory.id)}
                        value={workCategory.atTo ? moment(workCategory.atTo, "HH:mm").toDate().toHourMinuteFormatString() : "00:00"} />
                </Grid>
            </Grid>
            <Grid container css={mb3}>
                <Grid item sm={6} xs={12} css={pr2}>
                    <TextField type="number" label="week day require" required value={workCategory.weekDayRequire}
                        onChange={changeWeekdayRequire(workCategory.id)} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField type="number" label="week day max" required value={workCategory.weekDayMax}
                        onChange={changeWeekdayMax(workCategory.id)} />
                </Grid>
            </Grid>
            <Grid container css={mb3}>
                <Grid item sm={6} xs={12} css={pr2}>
                    <TextField type="number" label="holiday require" required value={workCategory.holidayRequire}
                        onChange={changeHolidayRequire(workCategory.id)} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField type="number" label="holiday max" required value={workCategory.holidayMax}
                        onChange={changeHolidayMax(workCategory.id)} />
                </Grid>
            </Grid>
            <Grid container css={mb3}>
                <Grid item sm={6} xs={12} css={pr2}>
                    <TextField type="number" label="day offs" required value={workCategory.dayOffs}
                        onChange={changeRestDay(workCategory.id)} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField type="number" label="max times" required value={workCategory.maxTimes}
                        onChange={changeMaxTimes(workCategory.id)} placeholder="0 means unlimited" />
                </Grid>
            </Grid>
            <PopupCheckList name={'WeekDay Operators'} targets={operators.map((x) => ({id: x.id, name: x.user.name, obj: x}))}
                current={workCategory.weekDayOperators.map((x) => ({id: x.id, name: x.user.name}))}
                onSelectChange={(x) => changeWeekdayOperators(workCategory.id, x)} />
            <PopupCheckList name={'Holiday Operators'} targets={operators.map((x) => ({id: x.id, name: x.user.name, obj: x}))}
                current={workCategory.holidayOperators.map((x) => ({id: x.id, name: x.user.name}))}
                onSelectChange={(x) => changeHolidayOperators(workCategory.id, x)} />
            <PopupCheckList name={'Essential Skills'} targets={skills.map((x) => ({id: x.id, name: x.name, obj: x}))}
                current={workCategory.essentialSkills.map((x) => ({id: x.id, name: x.name}))}
                onSelectChange={(x) => changeEssentialSkills(workCategory.id, x)} />
            <PopupCheckList name={'Exclusive Operators'} targets={operators.map((x) => ({id: x.id, name: x.user.name, obj: x}))}
                current={workCategory.exclusiveOperators.map((x) => ({id: x.id, name: x.user.name}))}
                onSelectChange={(x) => changeExclusiveOperators(workCategory.id, x)} />
            <PopupCheckList name={'Impossible Operators'} targets={operators.map((x) => ({id: x.id, name: x.user.name, obj: x}))}
                current={workCategory.impossibleOperators.map((x) => ({id: x.id, name: x.user.name}))}
                onSelectChange={(x) => changeImpossibleOperators(workCategory.id, x)} />
        </CardContent>
        <CardActions css={ml2}>
            <Button onClick={remove(workCategory.id)} variant="outlined" color="secondary">
                Remove
            </Button>
        </CardActions>
    </Card>
);

workCategory.propTypes = {
    workCategory: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    changeTitle: PropTypes.func.isRequired,
    changeAtFrom: PropTypes.func.isRequired,
    changeAtTo: PropTypes.func.isRequired,
    changeWeekdayRequire: PropTypes.func.isRequired,
    changeWeekdayMax: PropTypes.func.isRequired,
    changeHolidayRequire: PropTypes.func.isRequired,
    changeHolidayMax: PropTypes.func.isRequired,
    changeRestDay: PropTypes.func.isRequired,
    changeMaxTimes: PropTypes.func.isRequired,
    changeWeekdayOperators: PropTypes.func.isRequired,
    changeHolidayOperators: PropTypes.func.isRequired,
    changeEssentialSkills: PropTypes.func.isRequired,
    changeExclusiveOperators: PropTypes.func.isRequired,
    changeImpossibleOperators: PropTypes.func.isRequired,
};

export default workCategory;