import React from 'react';

import requestAgent from 'superagent';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeaderRow from '../../schedule/components/DayHeaderRow';
import SelectableRow from './SelectableRow';
import TotalRow from '../../schedule/components/TotalRow';

import { zip, transpose } from 'array-util';

const tableCss = css({
    overflow: 'auto',
    height: '64vh',
    width: '95vw',
    display: 'block',
    borderCollapse: 'initial'
});

class schedules extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            workCategories: [],
            availableSigns: []
        };
        requestAgent
            .get('/api/work-categories')
            .query({'team-id': props.team.id})
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                const workCategories = JSON.parse(res.text);
                this.setState({workCategories: workCategories});
            });
        requestAgent
            .get('/api/available-signs')
            .set('X-CSRFToken', csrfToken)
            .then((res) => {
                const availableSigns = JSON.parse(res.text);
                this.setState({availableSigns: availableSigns});
            });
    }

    componentDidMount () {
        const { team, scheduleOf } = this.props;
        this.props.onLoad(team, scheduleOf);
    }

    getAllWorkCategoriesName () {
        return this.state.workCategories.map((x) => x.title).concat(this.state.availableSigns);
    }

    getAllWorkCategoriesId () {
        return this.state.workCategories.map((x) => x.id).concat(this.state.availableSigns);
    }

    render () {
        const { daySettings, schedules, isLoading, onCategoryChange } = this.props;
        if (isLoading) {
            return (
                <LinearProgress variant="query" css={css`margin: 10rem`} />
            );
        }

        if (schedules.length == 0) {
            return (
                <Typography variant="h5" css={css`margin: 10rem`}>Sorry, this month is not create yet...</Typography>
            );
        }

        const categories = daySettings.map((x) => this.getAllWorkCategoriesName().concat(x.fixedSchedules.map((y) => y.title)));
        const headerRow = {
            headers: [''].concat(this.getAllWorkCategoriesName()),
            cells: daySettings.map((x) => ({name: x.dayName, day: x.day, isHoliday: x.isHoliday}))
        };
        const operatorRows = schedules.components.map((x) => {
            const totals = this.getAllWorkCategoriesId().map((y) => x.dayWorkCategories.filter((z) => z.workCategoryId == y).length);
            return {
                headers: [x.operator.user.name].concat(totals),
                cells: zip(x.dayWorkCategories, categories, daySettings),
                onCategoryChange: onCategoryChange(this.state.workCategories, x.operator)
            }});
        const tSchedules = transpose(schedules.components.map((x) => x.dayWorkCategories));
        const totals = this.state.workCategories.map((x) => ({ workCategory: x, totals: tSchedules.map((y) => y.filter((z) => z.workCategoryId == x.id).length)}));
        const totalRows = totals.map((x) => ({
                headers: [x.workCategory.title].concat(this.getAllWorkCategoriesName().map(() => '')),
                cells: zip(x.totals, daySettings).map(([a, b]) => ({category: x.workCategory, daySetting: b, count: a}))
            }));
        return (
            <Table css={tableCss}>
                <TableHead>
                    <DayHeaderRow {...headerRow} />
                </TableHead>
                <TableBody>
                    {operatorRows.map((x, i) => <SelectableRow key={i} {...x} />)}
                </TableBody>
                <TableFooter>
                    {totalRows.map((x, i) => <TotalRow key={i} {...x} bottom={rows.length-i-1} />)}
                </TableFooter>
            </Table>
        );
    }
}

export default schedules;