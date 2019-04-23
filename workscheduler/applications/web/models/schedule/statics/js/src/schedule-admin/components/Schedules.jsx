import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeader from '../../schedule/components/DayHeader';
import DayRow from '../../schedule/components/DayRow';
import DayRows from '../../schedule/components/DayRows';

const dataset = document.querySelector('script[src*="schedule-admin"]').dataset;

const schedules = () => {
    const schedules = JSON.parse(dataset.schedules);

    return (
        <React.Fragment>
            <Table>
                <DayHeader schedule={schedules[0].schedule} />
                <TableBody>
                    <DayRows schedules={schedules} />
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default schedules;