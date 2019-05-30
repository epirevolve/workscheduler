import React from 'react';

import requestAgent from 'superagent';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeaderRow from '../../schedule/components/DayHeaderRow';
import SelectableRow from './SelectableRow';
import TotalRows from '../../schedule/components/TotalRows';

import { zip } from 'array-util'

const tableCss = css({
    overflow: 'auto',
    height: '64vh',
    width: '95vw',
    display: 'block',
    borderCollapse: 'initial'
})

class schedules extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            workCategories: []
        }
        requestAgent
            .get(`/api/scheduler?affiliation-id=${props.affiliation.id}`)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const scheduler = JSON.parse(res.text)
                this.setState({workCategories: scheduler.workCategories})
            })
    }

    componentDidMount() {
        const { affiliation, scheduleOf } = this.props;
        this.props.onLoad(affiliation, scheduleOf);
    }

    render () {
        const { daySettings, schedules, totals, isLoading, onCategoryChange } = this.props;
        if (isLoading) {
            return (
                <LinearProgress variant="query" css={css`margin: 10rem`} />
            )
        }

        if (schedules.length == 0) {
            return (
                <Typography variant="h5" css={css`margin: 10rem`}>Sorry, this month is not create yet...</Typography>
            )
        }

        const categories = daySettings.map(x => [""].concat(x.details.map(y => y.workCategory.title)).concat(["-"])
            .concat(x.fixedSchedules.map(y => y.title)));
        const headerRow = {
            headers: [''].concat(this.state.workCategories.map(x => x.title).concat(['-', ''])),
            cells: daySettings.map(x => ({name: x.dayName, day: x.day, isHoliday: x.isHoliday}))
        };
        const operatorRows = schedules.map(x => ({
                headers: [x.operator.user.name].concat(x.totals.map(y => y.total)),
                cells: zip(x.schedule, categories, daySettings),
                onCategoryChange: onCategoryChange(this.state.workCategories, x.operator)
            }));
        const totalRows = totals.map((x, i) => {
            return {
                headers: [x.workCategory.title].concat(this.state.workCategories.map(x => '').concat(['', ''])),
                cells: zip(x.totals, daySettings).map(([a, b]) => ({category: x.workCategory, daySetting: b, ...a}))
            }});
        return (
            <Table css={tableCss}>
                <DayHeaderRow {...headerRow} />
                <TableBody>
                    {operatorRows.map((x, i) => <SelectableRow key={i} {...x} />)}
                </TableBody>
                <TotalRows rows={totalRows} />
            </Table>
        )
    }
}

export default schedules;