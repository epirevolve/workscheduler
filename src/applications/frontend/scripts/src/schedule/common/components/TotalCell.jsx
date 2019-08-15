import React from 'react';
import propTypes from "prop-types";

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { p3 } from "padding";
import { w6 } from "width";

const cellCss = {
    textAlign: 'center !important'
};

const getColorByState = (count, category, daySetting) => {
    const detail = daySetting.details.find((x) => x.workCategory.id == category.id);
    if (count > detail.require) return 'greenyellow';
    if (count < detail.require) return 'red';
    return '';
};

const totalCell = ({ count, category, daySetting }) => {
    const [ state, setState ] = React.useState({ css: {}});

    React.useMemo(() => {
        const colorName = getColorByState(count, category, daySetting);
        setState((prev) => ({ ...prev, css: colorName ? { ...cellCss, color: `${colorName} !important` } : cellCss }));
    }, [ count, category ]);

    return (
        <TableCell css={css(state.css, w6, p3)}>
            {count}
        </TableCell>
    );
};

totalCell.propTypes = {
    count: propTypes.number.isRequired,
    category: propTypes.object,
    daySetting: propTypes.object
};

export default React.memo(totalCell);