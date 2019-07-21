import React from 'react';
import propTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import Request from './Request';

import { showSnackbar } from 'snackbarActions';

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
},m2);

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

const dataset = document.querySelector('script[src*="request"]').dataset;
const scheduleOf = new Date(dataset.scheduleOf);

function handleAppend (day, action) {
    if (day.requests.length >= 2) {
        //dispatch(showSnackbar('cant append more request on this day'));
        return;
    }

    const date = `${scheduleOf.getFullYear()}-${scheduleOf.getMonth() + 1}-${day.day}`;

    action(
        new Date(`${date}T09:30`),
        new Date(`${date}T18:00`)
    );
}

const calendarCell = ({ day, append, edit }) => {
    if (!day)
        return <Grid item xs css={cellCss}></Grid>;

    const requests = [];

    for (const request of day.requests) {
        if (request.operator.id != operatorId || (new Date(request.atFrom).getDate() != day.day && day.day != 1 && day.dayName != 'Sun'))
            continue;
        const from = new Date(request.atFrom);
        from.setDate(day.day);
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
                    onClick={() => handleAppend(day, append)}>
                    <EditRoundedIcon />
                </IconButton>
                <span css={dayCss}>{day.day}</span>
            </div>
            <div css={containerCss}>
                {requests}
            </div>
        </Grid>
    );
};

calendarCell.propTypes = {
    day: propTypes.object,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired
};

export default calendarCell;