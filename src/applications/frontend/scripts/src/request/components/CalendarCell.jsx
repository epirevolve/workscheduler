import React from 'react';
import propTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import Request from './Request';

import { currentUser } from "../embeddedData";

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
    margin: '.3rem'
});

const calendarCell = ({ daySetting, currentDate, append, edit }) => {
    if (!daySetting || daySetting == void 0) return <Grid item xs css={cellCss}></Grid>;

    const requests = [];

    for (const request of daySetting.requests) {
        if (request.operator.id != currentUser.operator.id || (new Date(request.atFrom).getDate() != daySetting.day && daySetting.day != 1 && daySetting.dayName != 'Sun'))
            continue;
        const from = new Date(request.atFrom);
        from.setDate(daySetting.day);
        const to = new Date(request.atTo);
        let days = to.getDate() - from.getDate();
        if (days <= 7 && from.getDay() <= to.getDay()) {}
        else {
            days = 6 - from.getDay();
        }
        requests.push(<Request key={request.id} request={request} className={`day-${days + 1}`} edit={() => edit(request)} />);
    }

    return (
        <Grid item xs css={cellCss}>
            <div>
                <IconButton aria-label="Add Request" color="secondary" css={requestIconCss}
                    onClick={() => append(daySetting, currentDate)}>
                    <EditRoundedIcon />
                </IconButton>
                <span css={dayCss}>{daySetting.day}</span>
            </div>
            <div css={containerCss}>
                {requests}
            </div>
        </Grid>
    );
};

calendarCell.propTypes = {
    daySetting: propTypes.object,
    currentDate: propTypes.object.isRequired,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired
};

export default calendarCell;