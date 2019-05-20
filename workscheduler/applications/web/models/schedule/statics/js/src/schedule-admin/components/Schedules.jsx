import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import Cell from '../../schedule/components/Cell';
import TotalCell from '../../schedule/components/TotalCell';
import DayHeaderColumns from '../../schedule/components/DayHeaderColumns';
import Rows from '../../schedule/components/Rows';

class schedules extends React.Component {
    componentDidMount() {
        const { affiliation, scheduleOf } = this.props;
        this.props.onLoad(affiliation, scheduleOf);
    }

    render () {
        const { daySettings, schedules, totals } = this.props;

        if (schedules.length == 0) {
            return (
                <div>Sorry this month is not create yet</div>
            )
        }

        const headers = [{day: ''}, {day: ' '}].concat(daySettings.map(x => ({name: x.dayName, ...x})))
        const operatorRows = schedules.map(x => {
            const totals = x.totals.map(y => ({key: y.workCategory.id, val: y.total}))
            const schedules = x.schedule.map(y => ({key: y.day, val: y.name}))
            const cells = totals.concat(schedules)
            return {
                key: x.operator.user.id,
                header: x.operator.user.name,
                cells: cells.map(x => <Cell {...x} />)
            }})
        const totalRows = totals.map((x, i) => {
            const cells = [{day: ''}, {day: ' '}].concat(x.totals.map((y, l) => ({key: l, val: y.count, ...y})))
            return {
                key: i,
                header: x.workCategory.title,
                cells: cells.map(z => <TotalCell {...z} />)
            }})
        return (
            <React.Fragment>
                <Table css={css`
                        overflow: auto;
                        height: 64vh;
                        width: 95vw;
                        display: block;
                    `}>
                    <DayHeaderColumns headers={headers} />
                    <TableBody>
                        <Rows rows={operatorRows} />
                        <Rows rows={totalRows} />
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

export default schedules;