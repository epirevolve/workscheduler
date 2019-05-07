import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayColumnHeaders from '../../schedule/components/DayColumnHeaders';
import Rows from '../../schedule/components/Rows';

const schedules = () => {
    const dataset = document.querySelector('script[src*="schedule-admin"]').dataset;

    const monthlySetting = JSON.parse(dataset.monthlySetting)
    const headers = monthlySetting.days.map(x => {return {name: x.dayName, day: x.day, isHoliday: x.isHoliday}})

    const schedules = JSON.parse(dataset.schedules);
    const rows = schedules.map(x => {
        return {
            key: x.operator.id,
            header: x.operator.user.name,
            cells: x.schedule.map(y => {return {key: y.day, val: y.name}})
        }})
    return (
        <React.Fragment>
            <Table css={css`
                    overflow: auto;
                    height: 70vh;
                    width: 95vw;
                    display: block;
                `}>
                <DayColumnHeaders headers={headers} />
                <TableBody>
                    <Rows rows={rows} />
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default schedules;