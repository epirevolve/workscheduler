import React from 'react';
import propTypes from "prop-types";

import Fab from '@material-ui/core/Fab';
import CloudDownloadRoundedIcon from '@material-ui/icons/CloudDownloadRounded';

import formatSchedule from '../../common/services/formatSchedule';

import { CSVLink } from "react-csv";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { m2 } from "margin";

const iconCss = css({
    float: 'right',
    zIndex: 999,
}, m2);

const csvExportButton = ({ team, daySettings, isShown, schedules, workCategories, availableSigns }) => {
    if (!isShown || !schedules || !schedules.components || schedules.components.length == 0) return (<></>);
    const [ headerRow, operatorRows, totalRows ] = formatSchedule(daySettings, schedules, workCategories, availableSigns);
    const header1 = headerRow.headers.map(() => '').concat(headerRow.cells.map((x) => x.name));
    const header2 = headerRow.headers.map((x) => x).concat(headerRow.cells.map((x) => x.day));
    const cells = operatorRows.map((x) => x.headers.concat(
        x.cells.map(([ a, b, c ], i) => {
            const categories = c.fixedSchedules.concat(c.details.map((x) => x.workCategory));
            const category = categories.find((x) => x.id == a.workCategoryId);
            return category ? category.title : a.workCategoryId;
        }
    )));
    const totals = totalRows.map((x) => x.headers.concat(x.cells.map((y) => y.count)));
    return (
        <CSVLink data={[ header1, header2, ...cells, ...totals ]}
            filename={`${team.name}-${schedules.year}-${schedules.month}.csv`}>
            <Fab color="default" css={iconCss}>
                <CloudDownloadRoundedIcon />
            </Fab>
        </CSVLink>
    );
};

csvExportButton.propTypes = {
    daySettings: propTypes.array,
    isShown: propTypes.bool,
    schedules: propTypes.object,
    team: propTypes.object,
    workCategories: propTypes.array,
    availableSigns: propTypes.array
};

export default csvExportButton;