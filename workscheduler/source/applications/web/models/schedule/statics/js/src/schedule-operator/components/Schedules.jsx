import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import DayHeaderCell from '../../schedule/components/DayHeaderCell';
import Cell from '../../schedule/components/Cell';
import TotalCell from '../../schedule/components/TotalCell';
import DayHeaderRow from '../../schedule/components/DayHeaderRow';
import Rows from '../../schedule/components/Rows';

class schedules extends React.Component {
    componentDidMount() {
        this.props.onLoad(this.props);
    }

    render () {
        const { daySettings, schedules, totals } = this.props;

        if (schedules.length == 0) {
            return (
                <div>Sorry this month is not create yet</div>
            )
        }

        let css_ = {
            position: 'sticky',
            background: 'white',
            zIndex: 99,
        }
        const _cssByIndex = i => ({...css_, left: 7+(5*i)+'rem'})
        const headers = [{day: ''}, {day: ' '}].map((x, i) => <DayHeaderCell key={x.day} {...x} css_={_cssByIndex(i)} />)
            .concat(daySettings.map(x => ({name: x.dayName, ...x})).map(x => <DayHeaderCell key={x.day} {...x} />))
        const operatorRows = schedules.map(x => {
            const totals = x.totals.map(y => ({key: y.workCategory.id, val: y.total}))
            const schedules = x.schedule.map(y => ({key: y.day, val: y.name}))
            const cells = totals.map((y, i) => <Cell key={y.key} {...y} css_={_cssByIndex(i)} />)
                .concat(schedules.map(y => <Cell key={y.key} {...y} />))
            return {
                key: x.operator.user.id,
                header: x.operator.user.name,
                cells: cells
            }})
        const totalRows = totals.map((x, i) => {
            const cells = [{day: ''}, {day: ' '}].concat(x.totals.map((y, l) => ({key: l, val: y.count, state: y.state})))
            return {
                key: i,
                header: x.workCategory.title,
                cells: cells.map(z => <TotalCell {...z} />)
            }})
        return (
            <>
                <Table css={css`
                        overflow: auto;
                        height: 74vh;
                        width: 95vw;
                        display: block;
                        border-collapse: initial;
                    `}>
                    <DayHeaderRow headers={headers} />
                    <TableBody>
                        <Rows rows={operatorRows.filter(x => x.key == myId)} />
                        <Rows rows={operatorRows.filter(x => x.key != myId)} />
                        <Rows rows={totalRows} />
                    </TableBody>
                </Table>
            </>
        )
    }
}

export default schedules;