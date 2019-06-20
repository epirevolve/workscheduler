import React from 'react';

import Fab from '@material-ui/core/Fab';
import CloudDownloadRoundedIcon from '@material-ui/icons/CloudDownloadRounded';

import { CSVLink } from "react-csv";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { m2 } from 'margin';

const iconCss = css({
    float: 'right',
    zIndex: 9999
},m2);

const csvExportButton = ({daySettings, schedules}) => {
    return (
        <CSVLink data={''} filename={`workschedule-${schedules.year}-${schedules.month}.csv`}>
            <Fab color="default" css={iconCss}>
                <CloudDownloadRoundedIcon />
            </Fab>
        </CSVLink>
    );
};

export default csvExportButton;