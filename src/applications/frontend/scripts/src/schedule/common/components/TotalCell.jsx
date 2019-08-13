import React from 'react';

import TableCell from '@material-ui/core/TableCell';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const css_ = {
    minWidth: '5rem',
    maxWidth: '5rem',
    padding: '1rem !important',
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
        setState((prev) => ({ ...prev, css: colorName ? { ...css_, color: colorName } : css_ }));
    }, [ count, category ]);

    return (
        <TableCell css={css(state.css)}>
            {count}
        </TableCell>
    );
};

export default React.memo(totalCell);