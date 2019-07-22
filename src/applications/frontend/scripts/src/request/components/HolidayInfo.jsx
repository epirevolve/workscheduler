import React from 'react';
import propTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { currentUser } from "../embeddedData";

const holidayInfo = ({ holidays }) => (
    <>
        <Typography variant="h5">Monthly Holidays</Typography>
        <Typography variant="body1">{holidays || 0} days</Typography>
        <Divider />
        <Typography variant="h5">Remained Paid Holidays</Typography>
        <Typography variant="body1">{currentUser.operator.remainPaidHolidays || 0} days</Typography>
    </>
);

holidayInfo.propTypes = {
    holidays: propTypes.number
};

export default holidayInfo;