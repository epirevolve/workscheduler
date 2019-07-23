import React from 'react';
import propTypes from 'prop-types';

import moment from "moment";

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Box from "@material-ui/core/Box";

import Request from './Request';

import { currentOperator } from "../embeddedData";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { m2 } from 'margin';

const cellCss = css({
    textAlign: 'right',
    height: '7rem',
    padding: 0,
    border: '.1rem solid #dee2e6'
});

const dayCss = css({
    fontSize: '1.3rem'
}, m2);

const requestIconCss = css({
    float: 'left',
    margin: '.3rem',
    padding: '0rem'
});

const containerCss = css({
    maxHeight: '60%',
    width: '95%',
    margin: '.3rem',
    textAlign: 'initial'
});

const calendarCell = ({ daySetting, currentDate, append, edit }) => {
    if (!daySetting || daySetting == void 0) return <Grid item xs css={cellCss} />;

    const requests = [];
    for (const request of daySetting.requests) {
        const from = moment(request.atFrom);
        if (request.operator.id != currentOperator.id || (from.date() != daySetting.day && daySetting.dayName != 'Sun'))
            continue;
        const to = moment(request.atTo);
        let days = to.date() - from.date();
        if (days > 7 || from.day() > to.day()) days = 6 - from.day();
        requests.push(<Request key={request.id} request={request} days={days} edit={edit} />);
    }

    return (
        <Grid item xs css={cellCss}>
            <>
                <IconButton aria-label="Add Request" color="secondary" css={requestIconCss}
                    onClick={() => append(daySetting, currentDate)}>
                    <EditRoundedIcon />
                </IconButton>
                <Box css={dayCss}>{daySetting.day}</Box>
            </>
            <Box css={containerCss}>
                {requests}
            </Box>
        </Grid>
    );
};

calendarCell.propTypes = {
    daySetting: propTypes.object,
    currentDate: propTypes.object,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired
};

export default calendarCell;