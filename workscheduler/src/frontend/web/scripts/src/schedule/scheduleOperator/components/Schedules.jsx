import React from 'react';
import propTypes from "prop-types";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeaderRow from '../../common/components/DayHeaderRow';
import Row from '../../common/components/Row';
import TotalRow from '../../common/components/TotalRow';
import formatSchedule from '../../common/services/formatSchedule';

const tableCss = css({
    '& > table': {
        overflow: 'auto',
        height: '74vh',
        width: '96.5vw',
        display: 'block',
        borderCollapse: 'initial'
}});

const margin10Css = css({
    margin: '10rem'
});

const schedules = ({
        daySettings, schedules, workCategories, availableSigns
    }) => {
    if (!schedules || !schedules.components || schedules.components.length == 0 || !schedules.isPublished)
        return (<Box css={margin10Css}><Typography variant="h5">Sorry, this month is not create yet...</Typography></Box>);
    
    const [ headerRow, operatorRows, totalRows ] = formatSchedule(daySettings, schedules, workCategories, availableSigns);
    return (
        <Box css={tableCss}>
            <Table>
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
        </Box>
    );
};

schedules.propTypes = {
    daySettings: propTypes.array,
    schedules: propTypes.object,
    workCategories: propTypes.array,
    availableSigns: propTypes.array,
};

export default schedules;