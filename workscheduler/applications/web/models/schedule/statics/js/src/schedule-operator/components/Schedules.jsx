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
    const othersSchedule = JSON.parse(dataset.othersSchedule);
    const myRow = {
        header: mySchedule.operator.user.name,
        cells: mySchedule.map(x => {return {key: x.day, val: x.name}})
    }
    const othersRow = othersSchedule.map(x => {
        return {
            key: x.operator.id,
            header: x.operator.user.name,
            cells: x.schedule.map(y => {return {key: y.day, val: y.name}})
        }})
    return (
        <React.Fragment>
            <Table>
                <DayColumnHeaders headers={headers} />
                <TableBody css={css`
                    overflow: auto;
                    height: 74vh;
                    width: 95vw;
                    display: block;
                `}>
                    <Row {...myRow} />
                    <Rows rows={othersRow} />
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default schedules;