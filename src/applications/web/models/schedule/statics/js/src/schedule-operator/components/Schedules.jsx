import React from 'react';

import requestAgent from 'superagent';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import LinearProgress from '@material-ui/core/LinearProgress';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeaderRow from '../../schedule/components/DayHeaderRow';
import Row from '../../schedule/components/Row';
import TotalRow from '../../schedule/components/TotalRow';

import { zip, transpose } from 'array-util';

const tableCss = css({
    overflow: 'auto',
    height: '74vh',
    width: '95vw',
    display: 'block',
    borderCollapse: 'initial'
});

const dataset = document.querySelector('script[id="base-schedule"]').dataset;
const team = JSON.parse(dataset.team);

class schedules extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            workCategories: [],
            availableSigns: []
        };
        requestAgent
            .get('/api/work-categories')
            .query({'team-id': team.id})
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

    componentDidMount() {
        const { scheduleOf } = this.props;
        this.props.onLoad(team, scheduleOf);
    }

    getAllWorkCategoriesName () {
        return this.state.workCategories.map((x) => x.title).concat(this.state.availableSigns);
    }

    getAllWorkCategoriesId () {
        return this.state.workCategories.map((x) => x.id).concat(this.state.availableSigns);
    }

    render () {
        const { daySettings, schedules, isLoading } = this.props;
        if (isLoading) {
            return (
                <LinearProgress variant="query" css={css`margin: 10rem`} />
            );
        }

        if (schedules.length == 0) {
            return (
                <div>Sorry this month is not create yet</div>
            );
        }

        const headerRow = {
            headers: [''].concat(this.getAllWorkCategoriesName()),
            cells: daySettings.map((x) => ({name: x.dayName, day: x.day, isHoliday: x.isHoliday}))
        };
        const operatorRows = schedules.components.map((x) => {
            const totals = this.getAllWorkCategoriesId().map((y) => x.dayWorkCategories.filter((z) => z.workCategoryId == y).length);
            return {
                headers: [x.operator.user.name].concat(totals),
                cells: zip(x.dayWorkCategories, daySettings)
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
                    {operatorRows.map((x, i) => <Row key={i} {...x} />)}
                </TableBody>
                <TableFooter>
                    {totalRows.map((x, i) => <TotalRow key={i} {...x} bottom={totalRows.length-i-1} />)}
                </TableFooter>
            </Table>
        );
    }
}

export default schedules;