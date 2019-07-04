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

import DayHeaderRow from '../../common/components/DayHeaderRow';
import Row from '../../common/components/Row';
import TotalRow from '../../common/components/TotalRow';
import formatSchedule from '../../common/services/formatSchedule';

const tableCss = css({
    overflow: 'auto',
    height: '74vh',
    width: '96vw',
    display: 'block',
    borderCollapse: 'initial'
});

const margin10Css = css({
    margin: '10rem'
});

const dataset = document.querySelector('script[id="baseSchedule"]').dataset;
const team = JSON.parse(dataset.team);

class schedules extends React.Component {
    componentDidMount() {
        const { scheduleOf } = this.props;
        this.props.onLoad(team, scheduleOf);
    }

    render () {
        const { daySettings, schedules, isLoading, workCategories, availableSigns } = this.props;
        if (isLoading) return (<LinearProgress variant="query" css={margin10Css} />);
        if (schedules.length == 0) return (<Typography variant="h5" css={margin10Css}>Sorry this month is not create yet</Typography>);

        const [headerRow, operatorRows, totalRows] = formatSchedule(daySettings, schedules, workCategories, availableSigns);
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