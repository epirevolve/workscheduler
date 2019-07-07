import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeaderRow from '../../common/components/DayHeaderRow';
import SelectableRow from './SelectableRow';
import TotalRow from '../../common/components/TotalRow';
import formatSchedule from '../../common/services/formatSchedule';

const tableCss = css({
    overflow: 'auto',
    height: '77vh',
    width: '97vw',
    display: 'block',
    borderCollapse: 'initial'
});

const margin10Css = css({
    margin: '10rem'
});

class schedules extends React.Component {
    componentDidMount () {
        const { team, scheduleOf } = this.props;
        this.props.onLoad(team, scheduleOf);
    }

    render () {
        const { daySettings, schedules, isLoading, workCategories, availableSigns, changeCategory } = this.props;
        if (isLoading) return (<LinearProgress variant="query" css={margin10Css} />);
        if (!schedules || !schedules.components || schedules.components.length == 0) return (<Typography variant="h5" css={margin10Css}>Sorry, this month is not create yet...</Typography>);

        const [ headerRow, operatorRows, totalRows ] = formatSchedule(daySettings, schedules, workCategories, availableSigns);
        return (
            <Box css={tableCss}>
                <Table>
                    <TableHead>
                        <DayHeaderRow {...headerRow} />
                    </TableHead>
                    <TableBody>
                        {operatorRows.map((x, i) => <SelectableRow key={i} {...x}
                            changeCategory={changeCategory(workCategories, x.operator)} />)}
                    </TableBody>
                    <TableFooter>
                        {totalRows.map((x, i) => <TotalRow key={i} {...x} bottom={totalRows.length-i-1} />)}
                    </TableFooter>
                </Table>
            </Box>
        );
    }
}

export default schedules;