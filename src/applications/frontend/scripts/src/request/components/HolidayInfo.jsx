import React from 'react';
import propTypes from "prop-types";

/** @jsx jsx */
import { jsx } from '@emotion/core';

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import { my3, mx1, m2 } from "margin";

import { currentOperator } from "../embeddedData";

const holidayInfo = ({ isPublished, holidays, vacations }) => (
    <>
        {isPublished && (
            <>
                <Typography variant="h6">Monthly Holidays</Typography>
                <Typography variant="body1" css={m2}>{holidays || 0} days</Typography>
                <Divider css={my3} />
                <Typography variant="h6">Remained Paid Holidays</Typography>
                <Typography variant="caption" css={mx1}>This number is registered by yourself</Typography>
                <Typography variant="body1" css={m2}>{currentOperator.remainPaidHolidays || 0} days</Typography>
                {vacations &&
                    (vacations.map((x, i) => (
                        <Box key={i}>
                            <Divider css={my3} />
                            <Typography variant="h6">{x.title}</Typography>
                            <Typography variant="body1" css={m2}>{x.daysCount || 0} days</Typography>
                            <Typography variant="body1" css={m2}>from {x.onFrom} to {x.onTo}</Typography>
                        </Box>)) 
                    )
                }
            </>
        )}
    </>
);

holidayInfo.propTypes = {
    isPublished: propTypes.bool,
    holidays: propTypes.number,
    vacations: propTypes.array,
};

export default holidayInfo;