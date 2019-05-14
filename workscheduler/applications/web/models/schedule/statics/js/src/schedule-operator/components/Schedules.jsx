import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import DayColumnHeaders from '../../schedule/components/DayColumnHeaders';
import Row from '../../schedule/components/Row';
import Rows from '../../schedule/components/Rows';

const schedules = () => {
    const dataset = document.querySelector('script[src*="schedule-operator"]').dataset;

    const monthlySetting = JSON.parse(dataset.monthlySetting)
    const headers = monthlySetting.days.map(x => {return {name: x.dayName, day: x.day, isHoliday: x.isHoliday}})

    const mySchedule = JSON.parse(dataset.mySchedule);
    const myRow = (() => {
        const totals = mySchedule.totals.map(y => {return {key: y.workCategory.id, val: y.total}})
        const schedules = mySchedule.schedule.map(y => {return {key: y.day, val: y.name}})
        return {
            key: mySchedule.operator.id,
            header: mySchedule.operator.user.name,
            cells: totals.concat(schedules)
        }})()
    const othersSchedule = JSON.parse(dataset.othersSchedule);
    const othersRow = othersSchedule.map(x => {
        const totals = x.totals.map(y => {return {key: y.workCategory.id, val: y.total}})
        const schedules = x.schedule.map(y => {return {key: y.day, val: y.name}})
        return {
            key: x.operator.id,
            header: x.operator.user.name,
            cells: totals.concat(schedules)
        }})
    const totals = JSON.parse(dataset.totals);
    const totalRows = totals.map((x, i) => {
        return {
            key: i,
            header: x.workCategory.title,
            cells: ['', ''].concat(x.totals.map((y, l) => {return {key: l, val: y.count}}))
        }})
    return (
        <React.Fragment>
            <Table css={css`
                    overflow: auto;
                    height: 74vh;
                    width: 95vw;
                    display: block;
                `}>
                <DayColumnHeaders headers={headers} />
                <TableBody>
                    <Row {...myRow} />
                    <Rows rows={othersRow} />
                    <Rows rows={totalRows} />
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default schedules;