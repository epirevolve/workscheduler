import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import DayHeader from '../../schedule/components/DayHeader';
import DayRow from '../../schedule/components/DayRow';
import DayRows from '../../schedule/components/DayRows';

const dataset = document.querySelector('script[src*="schedule-operator"]').dataset;
const mySchedule = JSON.parse(dataset.mySchedule);
const othersSchedule = JSON.parse(dataset.othersSchedule);

const schedules = () => {
    return (
        <React.Fragment>
            <Table>
                <DayHeader schedule={mySchedule.schedule} />
                <TableBody>
                    <DayRow {...mySchedule} />
                    <DayRows schedules={othersSchedule} />
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default schedules;