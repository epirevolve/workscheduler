import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/** @jsx jsx */
import { css, jsx } from '@emotion/core'

class cell extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return zip(this.props["categories"], nextProps["categories"]).some(([x, y]) => x !== y)
            || this.props["val"] !== nextProps["val"]
    }

    render () {
        const { categories, val, onCategoryChange } = this.props;
        const options = categories.map((x, i) =>
            <MenuItem key={i} value={x}>{x}</MenuItem>);

        return (
            <TableCell css={css`
                min-width: 6rem;
                max-width: 6rem;
                padding: 1rem;
                text-align: center;
            `}>
                <Select value={val} onChange={onCategoryChange}
                    css={css`
                        min-width: 5rem;
                        max-width: 5rem;
                `}>
                    {options}
                </Select>
            </TableCell>
        )
    }
}

const zip = (array1, array2) => array1.map((_, i) => [array1[i], array2[i]]);

export default cell;